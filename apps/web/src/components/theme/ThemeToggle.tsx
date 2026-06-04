"use client";

import { MaterialIcon } from "@/components/home/MaterialIcon";
import { useTheme } from "./ThemeProvider";

type Props = {
  className?: string;
};

export function ThemeToggle({ className = "" }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`header-theme-toggle inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${className}`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <MaterialIcon
        name={theme === "dark" ? "light_mode" : "dark_mode"}
        className="!text-[20px]"
      />
    </button>
  );
}
