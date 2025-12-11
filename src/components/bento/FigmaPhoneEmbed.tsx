'use client';
import React, { useState } from "react";

type FigmaPhoneEmbedProps = {
  src?: string;
  title?: string;
  allowFullscreen?: boolean;
  hideUI?: boolean;
  scale?: number;
  tiltOnHover?: boolean;
  tiltDegrees?: number;
  backgroundColor?: string;
};

const DEFAULT_FIGMA_EMBED =
  "https://embed.figma.com/proto/pd4zIEGFuIqg4ZS4ru855K/Financial-Roadmap-App-Prototype--Copy-?node-id=1-2&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&embed-host=share";

export function FigmaPhoneEmbed({
  src = DEFAULT_FIGMA_EMBED,
  title = "Mobile prototype",
  allowFullscreen = false,
  hideUI = true,
  scale = 1.1,
  tiltOnHover = true,
  tiltDegrees = 6,
  backgroundColor = "#050505",
}: FigmaPhoneEmbedProps) {
  const iframeSrc = hideUI ? withParam(src, "hide-ui", "1") : src;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        Live
      </div>
      <div className="h-full w-full">
        <div
          className="h-full w-full transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `scale(${scale}) rotate(${
              tiltOnHover && hovered ? tiltDegrees : 0
            }deg)`,
            transformOrigin: "center",
            backgroundColor,
          }}
        >
          <iframe
            src={iframeSrc}
            title={title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock"
            allow="clipboard-write; encrypted-media"
            allowFullScreen={allowFullscreen}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

function withParam(url: string, key: string, value: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has(key)) {
      parsed.searchParams.set(key, value);
    }
    return parsed.toString();
  } catch {
    // If src is not a valid URL, fallback untouched
    return url;
  }
}

