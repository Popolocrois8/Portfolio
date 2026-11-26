export type MediaKind = "photo" | "video";

export interface ArchiveMediaEntry {
  id: string;
  title: string;
  caption: string;
  kind: MediaKind;
  src: string;
  poster?: string;
  width: number;
  height: number;
  aspectRatio: number;
  createdAt: string;
  order?: number;
}

export const CLOUDINARY_CLOUD_NAME = "sv4v6yug";
export const CLOUDINARY_TAG = "portfolio";
export const CLOUDINARY_VIDEO_TAGS = [
  "portfolio",
  "edit",
  "talking",
  "meme",
] as const;

interface CloudinaryListResource {
  public_id: string;
  version?: number;
  format?: string;
  width?: number;
  height?: number;
  created_at?: string;
  context?: {
    custom?: {
      title?: string;
      caption?: string;
      alt?: string;
      description?: string;
      [key: string]: string | undefined;
    };
  };
}

interface CloudinaryListResponse {
  resources?: CloudinaryListResource[];
}

function encodePublicId(publicId: string): string {
  return publicId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function humanizePublicId(publicId: string): string {
  const filename = publicId.split("/").pop() ?? publicId;
  const cleaned = filename.replace(/[_-]+/g, " ").trim();
  if (!cleaned) return "Untitled";
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function buildCloudinaryMediaUrl(
  publicId: string,
  kind: MediaKind,
  version?: number,
  cloudName = CLOUDINARY_CLOUD_NAME
): string {
  const resourceType = kind === "video" ? "video" : "image";
  const transforms = kind === "video" ? "f_auto,q_auto" : "f_auto,q_auto,w_1600";
  const versionSegment = version ? `v${version}/` : "";
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transforms}/${versionSegment}${encodePublicId(publicId)}`;
}

function normalizeStartOffset(rawOffset: string): string {
  const cleaned = rawOffset.replace(/^so_/i, "").trim();
  if (!cleaned) return "0";

  // Convert mm:ss or hh:mm:ss (e.g. "0:03", "1:25") into seconds for Cloudinary so_
  if (/^\d+(?::\d{1,2}){1,2}(?:\.\d+)?$/.test(cleaned)) {
    const parts = cleaned.split(":").map(Number);
    const seconds = parts.reduce((total, part) => total * 60 + part, 0);
    return String(seconds);
  }

  return cleaned;
}

export function buildCloudinaryVideoPoster(
  publicId: string,
  version?: number,
  cloudName = CLOUDINARY_CLOUD_NAME,
  startOffset = "0"
): string {
  const versionSegment = version ? `v${version}/` : "";
  const normalizedOffset = normalizeStartOffset(startOffset);
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_${encodeURIComponent(normalizedOffset)},f_auto,q_auto,w_1200/${versionSegment}${encodePublicId(publicId)}.jpg`;
}

function resolveVideoPoster(
  resource: CloudinaryListResource,
  cloudName: string
): string {
  const custom = resource.context?.custom;
  const customPoster = custom?.poster?.trim() || custom?.thumbnail?.trim();

  if (customPoster) {
    if (/^https?:\/\//i.test(customPoster)) {
      return customPoster;
    }
    return buildCloudinaryMediaUrl(customPoster, "photo", undefined, cloudName);
  }

  const customOffset =
    custom?.poster_time?.trim() ||
    custom?.thumbnail_time?.trim() ||
    custom?.poster_offset?.trim() ||
    custom?.so?.trim();

  return buildCloudinaryVideoPoster(
    resource.public_id,
    resource.version,
    cloudName,
    customOffset || "0"
  );
}

function mapCloudinaryResource(
  resource: CloudinaryListResource,
  kind: MediaKind,
  cloudName: string
): ArchiveMediaEntry {
  const custom = resource.context?.custom;
  const rawTitle = custom?.title?.trim() || custom?.caption?.trim();
  const title = rawTitle || humanizePublicId(resource.public_id);

  // Use description/alt, or caption when a separate title was provided
  const caption =
    custom?.description?.trim() ||
    custom?.alt?.trim() ||
    (custom?.title?.trim() && custom?.caption?.trim()
      ? custom.caption.trim()
      : "");

  const width =
    typeof resource.width === "number" && resource.width > 0
      ? resource.width
      : 1600;
  const height =
    typeof resource.height === "number" && resource.height > 0
      ? resource.height
      : 1000;

  // Clamp ratio so extreme panoramas or vertical strips remain balanced in the gallery
  const rawRatio = width / height;
  const aspectRatio = Math.max(0.62, Math.min(2.25, rawRatio));

  const rawOrder =
    custom?.order?.trim() ||
    custom?.sort_order?.trim() ||
    custom?.position?.trim();
  const parsedOrder = rawOrder ? Number(rawOrder) : NaN;
  const order = Number.isFinite(parsedOrder) ? parsedOrder : undefined;

  return {
    id: `${kind}:${resource.public_id}`,
    title,
    caption,
    kind,
    src: buildCloudinaryMediaUrl(
      resource.public_id,
      kind,
      resource.version,
      cloudName
    ),
    poster:
      kind === "video" ? resolveVideoPoster(resource, cloudName) : undefined,
    width,
    height,
    aspectRatio,
    createdAt: resource.created_at ?? "",
    order,
  };
}

async function fetchResourceListByType(
  resourceType: "image" | "video",
  cloudName: string,
  tag: string,
  signal?: AbortSignal
): Promise<ArchiveMediaEntry[]> {
  const url = `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/${resourceType}/list/${encodeURIComponent(tag)}.json`;
  const response = await fetch(url, { signal });

  // Cloudinary returns 404 when zero assets of that type carry the tag
  if (response.status === 404) {
    return [];
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error(
      "Cloudinary resource list access is restricted. Check Settings -> Security -> Resource list."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Failed to load Cloudinary ${resourceType}s (${response.status}).`
    );
  }

  const data = (await response.json()) as CloudinaryListResponse;
  const resources = Array.isArray(data.resources) ? data.resources : [];
  const kind: MediaKind = resourceType === "video" ? "video" : "photo";

  return resources.map((item) => mapCloudinaryResource(item, kind, cloudName));
}

export async function fetchCloudinaryTaggedMedia(
  cloudName = CLOUDINARY_CLOUD_NAME,
  tag?: string,
  signal?: AbortSignal
): Promise<ArchiveMediaEntry[]> {
  const imageTags = tag ? [tag] : [CLOUDINARY_TAG];
  const videoTags = tag ? [tag] : [...CLOUDINARY_VIDEO_TAGS];

  const [photoBatches, videoBatches] = await Promise.all([
    Promise.all(
      imageTags.map((t) =>
        fetchResourceListByType("image", cloudName, t, signal)
      )
    ),
    Promise.all(
      videoTags.map((t) =>
        fetchResourceListByType("video", cloudName, t, signal)
      )
    ),
  ]);

  const deduped = new Map<string, ArchiveMediaEntry>();
  for (const item of [...photoBatches.flat(), ...videoBatches.flat()]) {
    if (!deduped.has(item.id)) {
      deduped.set(item.id, item);
    }
  }

  return Array.from(deduped.values()).sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

/**
 * Packs items into balanced horizontal rows so every item in a row shares the
 * exact same rendered height while preserving each asset's natural aspect ratio.
 */
export function groupMediaIntoRows(
  items: ArchiveMediaEntry[],
  targetRowAspectSum = 3.1
): ArchiveMediaEntry[][] {
  const rows: ArchiveMediaEntry[][] = [];
  let currentRow: ArchiveMediaEntry[] = [];
  let currentSum = 0;

  for (const item of items) {
    currentRow.push(item);
    currentSum += item.aspectRatio;

    if (currentSum >= targetRowAspectSum || currentRow.length >= 3) {
      rows.push(currentRow);
      currentRow = [];
      currentSum = 0;
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}
