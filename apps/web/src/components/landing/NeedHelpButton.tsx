"use client";

import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { siteConfig } from "@/config/site";

const linkClassName =
  "fixed bottom-6 z-40 flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition-[left,right,transform] duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_10px_28px_-6px_rgba(0,0,0,0.5)] sm:bottom-8 sm:px-5 sm:py-3";

export function NeedHelpButton() {
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      setInHero(rect.bottom > window.innerHeight * 0.35);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        inHero
          ? `${linkClassName} left-1/2 -translate-x-1/2`
          : `${linkClassName} right-4 translate-x-0 sm:right-6`
      }
      aria-label="Need help? Chat with us on WhatsApp"
    >
      <MaterialIcon name="headset_mic" className="!text-[18px] text-[#fbbf24] sm:!text-[20px]" />
      <span>Need help?</span>
    </a>
  );
}
