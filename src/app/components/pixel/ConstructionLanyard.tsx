'use client';

import { useEffect, useState } from 'react';
import Lanyard from '../ui/Lanyard';

interface ConstructionTextures {
  frontImage: string;
  backImage: string;
  strapImage: string;
}

interface ResponsiveLayout {
  anchor: number;
  size: number;
  strapLength: number;
}

function getResponsiveLayout(width: number): ResponsiveLayout {
  if (width < 640) {
    return { anchor: 0.26, size: 0.21, strapLength: 0.04 };
  }
  if (width < 1024) {
    return { anchor: 0.17, size: 0.23, strapLength: 0.14 };
  }
  if (width < 1360) {
    return { anchor: 0.14, size: 0.24, strapLength: 0.14 };
  }
  return { anchor: 0.11, size: 0.245, strapLength: 0.14 };
}

function drawHazardStripes(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  stripeWidth = 38
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();

  ctx.fillStyle = '#FACC15';
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = '#141417';
  const span = width + height;
  for (let offset = -height; offset < span; offset += stripeWidth * 2) {
    ctx.beginPath();
    ctx.moveTo(x + offset, y + height);
    ctx.lineTo(x + offset + stripeWidth, y + height);
    ctx.lineTo(x + offset + stripeWidth + height, y);
    ctx.lineTo(x + offset + height, y);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawWarningTriangle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number
) {
  const halfW = size * 0.54;
  const topY = cy - size * 0.46;
  const botY = cy + size * 0.42;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, topY);
  ctx.lineTo(cx + halfW, botY);
  ctx.lineTo(cx - halfW, botY);
  ctx.closePath();
  ctx.lineJoin = 'round';
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#FACC15';
  ctx.fillStyle = '#FACC15';
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = '#141417';
  const barW = size * 0.115;
  const barH = size * 0.34;
  ctx.beginPath();
  ctx.roundRect(cx - barW / 2, cy - size * 0.17, barW, barH, barW / 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + size * 0.27, barW * 0.58, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function createFrontTexture(): string {
  const width = 1024;
  const height = 728;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Base industrial safety-yellow plate
  ctx.fillStyle = '#FACC15';
  ctx.fillRect(0, 0, width, height);

  // Compact top & bottom hazard stripe borders (leaving maximum space for signage)
  drawHazardStripes(ctx, 0, 0, width, 84, 38);
  drawHazardStripes(ctx, 0, height - 70, width, 70, 38);

  // Slot reinforcement pill around top punch hole
  ctx.fillStyle = '#141417';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 118, 18, 236, 56, 28);
  ctx.fill();

  // Crisp dark border lines
  ctx.fillStyle = '#141417';
  ctx.fillRect(0, 82, width, 10);
  ctx.fillRect(0, height - 76, width, 10);

  // Large high-contrast center plaque
  const padX = 34;
  const plateY = 108;
  const plateW = width - padX * 2;
  const plateH = height - plateY - 94;

  ctx.fillStyle = '#141417';
  ctx.beginPath();
  ctx.roundRect(padX, plateY, plateW, plateH, 26);
  ctx.fill();

  ctx.lineWidth = 6;
  ctx.strokeStyle = '#FACC15';
  ctx.beginPath();
  ctx.roundRect(padX + 14, plateY + 14, plateW - 28, plateH - 28, 16);
  ctx.stroke();

  // Top header row inside plaque: Warning triangle + WEBSITE
  drawWarningTriangle(ctx, width / 2 - 220, plateY + 108, 92);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FAFAFA';
  ctx.font = '800 76px Outfit, system-ui, -apple-system, sans-serif';
  ctx.fillText('WEBSITE', width / 2 - 140, plateY + 112);

  // Thin yellow divider rule
  ctx.fillStyle = 'rgba(250, 204, 21, 0.35)';
  ctx.fillRect(padX + 64, plateY + 180, plateW - 128, 4);

  // Huge bold two-line message so it reads clearly even at small card scale
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FACC15';
  ctx.font = '900 106px Outfit, system-ui, -apple-system, sans-serif';
  ctx.fillText('UNDER', width / 2, plateY + 272);

  ctx.font = '900 94px Outfit, system-ui, -apple-system, sans-serif';
  ctx.fillText('CONSTRUCTION', width / 2, plateY + 382);

  // Crisp footer tag
  ctx.fillStyle = '#E4E4E7';
  ctx.font = '700 32px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('PARDON THE DUST', width / 2, plateY + 468);

  return canvas.toDataURL('image/png');
}

function createBackTexture(): string {
  const width = 1024;
  const height = 728;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#141417';
  ctx.fillRect(0, 0, width, height);

  drawHazardStripes(ctx, 0, 0, width, 84, 38);
  drawHazardStripes(ctx, 0, height - 70, width, 70, 38);

  ctx.fillStyle = '#141417';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 118, 18, 236, 56, 28);
  ctx.fill();

  ctx.strokeStyle = 'rgba(250, 204, 21, 0.1)';
  ctx.lineWidth = 2;
  for (let gx = 48; gx < width; gx += 48) {
    ctx.beginPath();
    ctx.moveTo(gx, 84);
    ctx.lineTo(gx, height - 70);
    ctx.stroke();
  }
  for (let gy = 112; gy < height - 70; gy += 48) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(width, gy);
    ctx.stroke();
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = '#FACC15';
  ctx.font = '800 48px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('WORK IN PROGRESS', width / 2, 245);

  ctx.fillStyle = '#FAFAFA';
  ctx.font = '900 76px Outfit, system-ui, -apple-system, sans-serif';
  ctx.fillText('BUILDING NEW', width / 2, 345);
  ctx.fillText('PORTFOLIO PAGES', width / 2, 430);

  ctx.fillStyle = '#D4D4D8';
  ctx.font = '700 32px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('DRAG TO SWING • CLICK TO FLIP', width / 2, 535);

  return canvas.toDataURL('image/png');
}

function createCautionStrapTexture(): string {
  const width = 768;
  const height = 192;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#FACC15';
  ctx.fillRect(0, 0, width, height);

  drawHazardStripes(ctx, 0, 0, width, 32, 24);
  drawHazardStripes(ctx, 0, height - 32, width, 32, 24);

  ctx.fillStyle = '#141417';
  ctx.fillRect(0, 32, width, 6);
  ctx.fillRect(0, height - 38, width, 6);

  ctx.fillStyle = '#141417';
  ctx.font = '900 52px Outfit, system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CAUTION • UNDER CONSTRUCTION •', width / 2, height / 2 + 2);

  return canvas.toDataURL('image/png');
}

export default function ConstructionLanyard() {
  const [textures, setTextures] = useState<ConstructionTextures | null>(null);
  const [layout, setLayout] = useState<ResponsiveLayout>({
    anchor: 0.11,
    size: 0.245,
    strapLength: 0.16
  });

  useEffect(() => {
    let cancelled = false;
    const generate = () => {
      if (cancelled) return;
      setLayout(getResponsiveLayout(window.innerWidth));
      setTextures({
        frontImage: createFrontTexture(),
        backImage: createBackTexture(),
        strapImage: createCautionStrapTexture()
      });
    };

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(generate).catch(generate);
    } else {
      const id = requestAnimationFrame(generate);
      return () => {
        cancelled = true;
        cancelAnimationFrame(id);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      setLayout(getResponsiveLayout(window.innerWidth));
    };
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  if (!textures) {
    return null;
  }

  return (
    <div
      aria-label="Website under construction hanging badge"
      className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[500px] sm:h-[620px] md:h-[680px]"
    >
      <Lanyard
        frontImage={textures.frontImage}
        backImage={textures.backImage}
        strapImage={textures.strapImage}
        cardColor="#141417"
        strapColor="#FACC15"
        orientation="landscape"
        finish="glossy"
        metal="graphite"
        cornerRadius={0.22}
        size={layout.size}
        anchor={layout.anchor}
        strapLength={layout.strapLength}
        strapWidth={0.78}
        gravity={1.05}
        damping={0.68}
        elasticity={0.55}
        breeze={0.35}
        interactive
        intro
      />
    </div>
  );
}
