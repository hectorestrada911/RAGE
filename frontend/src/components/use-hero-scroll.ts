"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValue, useScroll, useTransform } from "framer-motion";

/** Measure the CSS stage, not innerHeight: mobile browser chrome must not scrub the story. */
export function useHeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sectionTop = useMotionValue(0);
  const sectionRange = useMotionValue(1);
  const revealDistance = useMotionValue(200);
  const [layout, setLayout] = useState({ compact: true, scale: 0.75 });
  const { scrollY } = useScroll();
  const progress = useTransform(() =>
    Math.max(0, Math.min(1, (scrollY.get() - sectionTop.get()) / sectionRange.get()))
  );

  useLayoutEffect(() => {
    const section = containerRef.current;
    const stage = stageRef.current;
    const headline = headlineRef.current;
    if (!section || !stage || !headline) return;

    const compactQuery = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    const measure = () => {
      const compact = compactQuery.matches;
      const height = stage.clientHeight;
      const scale = Math.max(0.25, Math.min(
        compact ? 0.9 : 1,
        (height - (compact ? 250 : 180)) / 620,
        (stage.clientWidth - 64) / 300,
      ));

      sectionTop.set(section.getBoundingClientRect().top + window.scrollY);
      sectionRange.set(Math.max(1, section.offsetHeight - height));
      revealDistance.set(Math.max(0, headline.offsetHeight + 48 - (height - 620 * scale - 32)));
      setLayout(previous => previous.compact === compact && previous.scale === scale
        ? previous : { compact, scale });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(stage);
    observer.observe(headline);
    compactQuery.addEventListener("change", measure);
    window.addEventListener("pageshow", measure);
    return () => {
      observer.disconnect();
      compactQuery.removeEventListener("change", measure);
      window.removeEventListener("pageshow", measure);
    };
  }, [sectionTop, sectionRange, revealDistance]);

  return { containerRef, stageRef, headlineRef, progress, sectionTop, sectionRange, revealDistance, ...layout };
}
