"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef, memo } from "react";
import type { Project } from "@/lib/projects";
import { MaterialIcon } from "@/components/home/MaterialIcon";

type Props = {
  project: Project;
  priority?: boolean;
  variant?: "carousel" | "grid";
};

export const PortfolioShowcaseCard = memo(
  forwardRef<HTMLAnchorElement, Props>(function PortfolioShowcaseCard(
    { project, priority = false, variant = "carousel" },
    ref,
  ) {
    const cover = project.screenshots?.[0];
    const isGrid = variant === "grid";

    return (
      <Link
        ref={ref}
        href={`/projects/${project.slug}`}
        data-carousel-card={isGrid ? undefined : true}
        className={`group relative flex w-full flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] transition hover:border-[#ff6b00]/25 hover:shadow-[0_20px_50px_-20px_rgba(255,107,0,0.35)] ${
          isGrid ? "aspect-video" : "aspect-video [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
        }`}
        style={
          isGrid
            ? undefined
            : {
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }
        }
      >
        {cover ? (
          <Image
            src={cover}
            alt={`${project.name} preview`}
            fill
            priority={priority}
            sizes={
              isGrid
                ? "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 704px"
            }
            className={`object-cover object-top transition-[filter,transform] duration-500 ease-in-out group-hover:scale-[1.03] ${
              isGrid
                ? "brightness-[0.48] saturate-[0.9] group-hover:brightness-[0.72] group-hover:saturate-100"
                : ""
            }`}
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#ff6b00]/20 via-[#1a1a1a] to-[#0a0a0a]"
            aria-hidden
          />
        )}

        <div
          className={
            isGrid
              ? "absolute inset-0 bg-gradient-to-t from-black via-black/92 to-black/70 transition-opacity duration-500 ease-in-out group-hover:opacity-80"
              : "absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/25"
          }
        />
        {isGrid ? (
          <div
            className="absolute inset-0 bg-black/30 transition-opacity duration-500 ease-in-out group-hover:opacity-10"
            aria-hidden
          />
        ) : null}
        <div
          data-carousel-glow
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,107,0,0.18),transparent_55%)] opacity-0 group-hover:opacity-80"
        />

        <div className="relative z-10 flex flex-col p-4 sm:p-5 lg:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff6b00]">
            {project.category}
          </p>
          <h3
            className={`landing-title mt-1.5 font-bold text-white sm:mt-2 ${
              isGrid ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl lg:text-[1.65rem]"
            }`}
          >
            {project.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 max-w-lg text-[13px] leading-relaxed text-white/65 sm:mt-2 sm:text-sm">
            {project.shortDescription}
          </p>

          <div className={`flex items-end justify-between gap-3 sm:gap-4 ${isGrid ? "mt-4" : "mt-4 sm:mt-5"}`}>
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-white/50">
              {project.techStack.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff6b00] transition-[gap] duration-300 group-hover:gap-2">
              View project
              <MaterialIcon name="arrow_forward" className="!text-[14px]" />
            </span>
          </div>
        </div>
      </Link>
    );
  }),
);
