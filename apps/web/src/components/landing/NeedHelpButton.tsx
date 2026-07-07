"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { siteConfig } from "@/config/site";

const linkClassName =
  "fixed bottom-6 left-1/2 z-40 flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition-[background-color,box-shadow] duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_10px_28px_-6px_rgba(0,0,0,0.5)] sm:bottom-8 sm:px-5 sm:py-3";

function getXOffset(inHero: boolean, width: number, viewportWidth: number) {
  const rightPadding = viewportWidth >= 640 ? 24 : 16;
  return inHero ? -width / 2 : viewportWidth / 2 - rightPadding - width;
}

export function NeedHelpButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const inHeroRef = useRef(true);
  const [inHero, setInHero] = useState(true);
  const [x, setX] = useState(0);

  const syncPosition = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setX(getXOffset(inHeroRef.current, el.offsetWidth, window.innerWidth));
  }, []);

  useLayoutEffect(() => {
    inHeroRef.current = inHero;
    syncPosition();
  }, [inHero, syncPosition]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      setInHero(rect.bottom > window.innerHeight * 0.35);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", syncPosition);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", syncPosition);
    };
  }, [syncPosition]);

  return (
    <motion.a
      ref={ref}
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
      animate={{ x }}
      transition={{
        type: "tween",
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label="Need help? Chat with us on WhatsApp"
    >
      <MaterialIcon name="headset_mic" className="!text-[18px] text-[#fbbf24] sm:!text-[20px]" />
      <span>Need help?</span>
    </motion.a>
  );
}
