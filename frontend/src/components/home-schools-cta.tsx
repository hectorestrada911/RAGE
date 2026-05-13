"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const row1 = [
  "NYU", "UCLA", "USC", "UMich", "Cornell", "Georgetown", "Duke", "Vanderbilt",
  "Emory", "Northwestern", "Notre Dame", "Tulane", "Fordham", "BU", "Northeastern",
  "NYU", "UCLA", "USC", "UMich", "Cornell", "Georgetown", "Duke", "Vanderbilt",
];

const row2 = [
  "UVA", "Dartmouth", "Princeton", "Yale", "SMU", "Wake Forest", "Rice", "Howard",
  "Tufts", "GWU", "American U", "Miami", "Pepperdine", "TCU", "Indiana",
  "UVA", "Dartmouth", "Princeton", "Yale", "SMU", "Wake Forest", "Rice", "Howard",
];

function MarqueeRow({ schools, reverse }: { schools: string[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-rev" : "marquee"} ${reverse ? 40 : 34}s linear infinite`,
          willChange: "transform",
        }}
      >
        {schools.map((s, i) => (
          <span
            key={i}
            className="text-3xl font-black uppercase tracking-tighter text-white/20 sm:text-4xl lg:text-5xl"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomeSchoolsCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-black px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
      <style>{`
        @keyframes marquee     { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); }    }
      `}</style>

      {/* Premium framed viewport: curved edges + depth instead of a flat full-bleed square */}
      <div
        className="relative mx-auto min-h-[min(92dvh,920px)] w-full max-w-[min(100%,1440px)] overflow-hidden rounded-[clamp(1.25rem,3.5vw,2.75rem)] border border-white/[0.09] bg-zinc-950 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.05]"
      >
        <video
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
          src="/a9-banner.mp4"
          poster="/host-review-scene.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.52) 42%, rgba(0,0,0,0.52) 58%, rgba(0,0,0,0.9) 100%), radial-gradient(ellipse 80% 55% at 50% 40%, rgba(0,0,0,0.15), transparent 62%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[620px] -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(75,250,148,0.11), transparent 72%)",
          }}
        />

        <div className="relative z-10 flex min-h-[min(92dvh,920px)] flex-col py-20 sm:py-28">
          <div className={`space-y-6 ${reduceMotion ? "opacity-30" : "opacity-100"}`}>
            <MarqueeRow schools={row1} />
            <MarqueeRow schools={row2} reverse />
          </div>

          <div className="mx-auto flex flex-1 flex-col justify-center px-5 pt-12 text-center sm:px-8 sm:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4BFA94]">
                While the feed is moving
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Miss the drop,
                <br />
                <span className="bg-gradient-to-r from-[#4BFA94] via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  miss the room.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg">
                The nights people actually show up for don&apos;t start at the door—they start when the flyer goes live.
                Get a QR ticket in two taps, or publish your own night before someone else fills the calendar.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex h-13 items-center rounded-full bg-white px-9 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-200"
                  style={{ height: 52 }}
                >
                  Register
                </Link>
                <Link
                  href="/create-event"
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.04] px-9 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/[0.08]"
                  style={{ height: 52 }}
                >
                  Create event
                </Link>
              </div>
              <p className="mt-5 text-xs text-zinc-500">
                Questions before you join?{" "}
                <Link href="/faq" className="font-medium text-zinc-300 underline-offset-2 transition hover:text-white hover:underline">
                  Read the FAQ
                </Link>
              </p>
            </motion.div>
          </div>

          <div className={`mt-auto space-y-6 pb-2 pt-8 ${reduceMotion ? "opacity-30" : "opacity-100"}`}>
            <MarqueeRow schools={row1} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
