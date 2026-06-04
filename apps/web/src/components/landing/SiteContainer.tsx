import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "nav";
};

export function SiteContainer({ children, className, as: Tag = "div" }: Props) {
  return <Tag className={cn("site-container", className)}>{children}</Tag>;
}
