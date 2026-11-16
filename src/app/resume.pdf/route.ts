import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const resumePath = path.join(process.cwd(), "media", "files", "Resume.pdf");
  const fileBuffer = await readFile(resumePath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Resume.pdf"',
    },
  });
}
