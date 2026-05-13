"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type FaqAccordionItem = { q: string; a: string; id?: string };

type FaqAccordionProps = {
  items: FaqAccordionItem[];
  className?: string;
};

export function FaqAccordion({ items, className = "" }: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw) return;
    const i = items.findIndex((it) => it.id === raw);
    if (i < 0) return;
    setOpenIdx(i);
    requestAnimationFrame(() => {
      document.getElementById(raw)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [items]);

  return (
    <div className={`space-y-2.5 ${className}`}>
      {items.map((item, idx) => {
        const open = openIdx === idx;
        return (
          <div
            key={item.id ?? item.q}
            id={item.id}
            className={`scroll-mt-28 overflow-hidden rounded-3xl border transition-[border-color,box-shadow,background-color] duration-200 ${
              open
                ? "border-[#4BFA94]/40 bg-[#0a100d] shadow-[0_0_0_1px_rgba(75,250,148,0.12),0_24px_48px_-28px_rgba(0,0,0,0.65)]"
                : "border-white/[0.08] bg-[#0f0f11] hover:border-white/[0.14] hover:bg-[#121214]"
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4BFA94]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="text-sm font-bold leading-snug tracking-[-0.02em] text-white sm:text-[15px]">{item.q}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg font-light leading-none transition ${
                  open
                    ? "rotate-45 border-[#4BFA94]/50 bg-[#4BFA94]/15 text-[#4BFA94]"
                    : "border-white/[0.1] bg-white/[0.04] text-zinc-400"
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="a"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="border-t border-white/[0.06]"
                >
                  <p className="px-5 py-4 text-sm leading-relaxed text-zinc-400 sm:px-6 sm:py-5 sm:text-[15px]">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
