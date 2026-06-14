"use client";

import Link from "next/link";
import { useState } from "react";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { ProjectScreenshotsModal } from "./ProjectScreenshotsModal";

type Props = {
  slug: string;
  name: string;
  screenshots?: string[];
  variant?: "landing" | "default";
};

export function ProjectCardActions({
  slug,
  name,
  screenshots = [],
  variant = "landing",
}: Props) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const isLanding = variant === "landing";

  const linkClass = isLanding
    ? "inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#ff6b00] transition-all hover:gap-2"
    : "text-sm font-medium text-[#ff6600] transition hover:text-[#ff8533]";

  const buttonClass = isLanding
    ? "inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[var(--landing-muted)] transition-all hover:gap-2 hover:text-[#ff6b00]"
    : "inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-[#ff6600]";

  return (
    <>
      <div className="mt-5 flex items-center justify-between gap-3">
        <Link href={`/projects/${slug}`} className={linkClass}>
          {isLanding ? "View case study" : "View Case Study →"}
          {isLanding && <MaterialIcon name="arrow_forward" className="text-sm" />}
        </Link>

        <button
          type="button"
          onClick={() => setGalleryOpen(true)}
          className={buttonClass}
        >
          View images
          <MaterialIcon name="photo_library" className="text-sm" />
        </button>
      </div>

      <ProjectScreenshotsModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        projectName={name}
        screenshots={screenshots}
      />
    </>
  );
}
