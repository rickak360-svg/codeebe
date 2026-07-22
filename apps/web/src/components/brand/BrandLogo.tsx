import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const LOGO_PATH = "/logo.png";

type Size = "md" | "lg";
type Variant = "full" | "header";

const sizeClasses: Record<Size, string> = {
  md: "h-9 w-auto sm:h-10",
  lg: "h-10 w-auto sm:h-11",
};

const headerSizeClasses =
  "block h-8 w-auto max-h-8 object-contain object-[left_center] sm:h-9 sm:max-h-9";

const sizeDimensions: Record<Size, { width: number; height: number }> = {
  md: { width: 200, height: 34 },
  lg: { width: 240, height: 42 },
};

/** Matches /logo.png (895×167) for correct aspect ratio and centering */
const headerDimensions = { width: 895, height: 167 };

type Props = {
  className?: string;
  showTagline?: boolean;
  size?: Size;
  variant?: Variant;
};

export function BrandLogo({
  className = "",
  showTagline = false,
  size = "md",
  variant = "full",
}: Props) {
  const isHeader = variant === "header";
  const dimensions = isHeader ? headerDimensions : sizeDimensions[size];
  const imageClass = isHeader
    ? `${headerSizeClasses} max-w-[180px] sm:max-w-[200px]`
    : `${sizeClasses[size]} max-w-[200px] object-contain object-left sm:max-w-[220px]`;

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${isHeader ? "header-brand-logo h-9 leading-none" : "gap-3"} ${className}`}
    >
      <Image
        src={LOGO_PATH}
        alt={siteConfig.name}
        width={dimensions.width}
        height={dimensions.height}
        className={imageClass}
        priority
      />
      {showTagline && variant === "full" && (
        <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-zinc-500 lg:block">
          {siteConfig.tagline}
        </span>
      )}
    </Link>
  );
}
