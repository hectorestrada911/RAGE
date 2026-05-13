"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PhoneShell } from "@/components/home-top-section";

const SIGNAL = "#4BFA94";

/* ──────────────────────────────────────────────────────────────────
   LEFT SCREEN: Door scanner (host POV at the door)
   ────────────────────────────────────────────────────────────────── */
function DoorScanScreen() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", paddingTop: 52, display: "flex", flexDirection: "column" }}>
      {/* App bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 14px 8px" }}>
        <span
          aria-hidden
          style={{
            width: 28,
            height: 28,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.18em", color: "#52525b", textTransform: "uppercase" }}>Door</span>
          <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "-0.02em", color: "#fafafa" }}>The Velvet</span>
        </div>
        <span
          aria-hidden
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: SIGNAL, boxShadow: `0 0 6px ${SIGNAL}` }} />
        </span>
      </div>

      {/* Stats strip */}
      <div style={{ padding: "0 14px 12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {[
          { label: "Scanned", value: "127" },
          { label: "Remaining", value: "23" },
          { label: "Rate / min", value: "9" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#121214",
              padding: "6px 8px",
            }}
          >
            <p style={{ margin: 0, fontSize: 6.5, fontWeight: 800, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase" }}>{s.label}</p>
            <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Scanner viewport */}
      <div style={{ padding: "0 14px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(160deg, #0d0f0d 0%, #060906 70%)",
            height: 174,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* corner brackets */}
          {[
            { top: 10, left: 10, br: "12px 0 0 0", borderWidths: "2px 0 0 2px" },
            { top: 10, right: 10, br: "0 12px 0 0", borderWidths: "2px 2px 0 0" },
            { bottom: 10, left: 10, br: "0 0 0 12px", borderWidths: "0 0 2px 2px" },
            { bottom: 10, right: 10, br: "0 0 12px 0", borderWidths: "0 2px 2px 0" },
          ].map((b, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                top: b.top,
                left: b.left,
                right: b.right,
                bottom: b.bottom,
                width: 22,
                height: 22,
                borderStyle: "solid",
                borderColor: SIGNAL,
                borderWidth: b.borderWidths,
                borderRadius: b.br,
                boxShadow: `0 0 14px rgba(75,250,148,0.45)`,
              }}
            />
          ))}

          {/* center success */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 25%, #7dffc0 0%, ${SIGNAL} 60%, #14b463 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 40px rgba(75,250,148,0.55), inset 0 0 0 1px rgba(255,255,255,0.25)`,
              }}
              aria-hidden
            >
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                <path d="M2 11.5L10 19L26 3" stroke="#0a0a0a" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: "0.18em", color: SIGNAL, textTransform: "uppercase" }}>Valid · 0.42s</span>
          </div>

          {/* scan line */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 30,
              right: 30,
              top: "50%",
              height: 2,
              borderRadius: 2,
              background: `linear-gradient(90deg, transparent, ${SIGNAL}, transparent)`,
              filter: "blur(0.4px)",
              opacity: 0.7,
            }}
          />
        </div>

        {/* Latest entry card */}
        <div
          style={{
            borderRadius: 14,
            border: `1px solid rgba(75,250,148,0.35)`,
            background: "linear-gradient(135deg, rgba(75,250,148,0.10) 0%, rgba(20,20,22,0.95) 60%)",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 0 0 3px rgba(75,250,148,0.05)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(140deg, #4f46e5 0%, #db2777 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: "-0.02em",
              flexShrink: 0,
            }}
            aria-hidden
          >
            MC
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: "#fafafa", letterSpacing: "-0.02em" }}>Maya Chen</p>
            <p style={{ margin: "2px 0 0", fontSize: 9, color: "#a1a1aa" }}>GA · 1 ticket · #00127</p>
          </div>
          <span
            style={{
              fontSize: 7,
              fontWeight: 900,
              letterSpacing: "0.12em",
              color: "#0a0a0a",
              background: SIGNAL,
              borderRadius: 999,
              padding: "4px 8px",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            ✓ In
          </span>
        </div>
      </div>

      {/* footer / scan again */}
      <div style={{ padding: "10px 14px 18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderRadius: 999,
            padding: "9px 12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#e4e4e7",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path d="M14 14h3v3h-3zM17 17h4v4h-4z" />
          </svg>
          Tap to scan next
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   CENTER SCREEN: Tonight, live (host dashboard)
   ────────────────────────────────────────────────────────────────── */
function TonightLiveScreen() {
  /* Tiny sparkline path (lower-left → upper-right) */
  const sparkPath =
    "M0 38 L12 34 L24 36 L36 28 L48 30 L60 24 L72 26 L84 18 L96 22 L108 14 L120 16 L132 8 L144 6 L156 10 L168 4";
  const bars = [
    { label: "Pre-sale", percent: 70, color: "rgba(255,255,255,0.85)" },
    { label: "Door", percent: 22, color: "rgba(75,250,148,0.95)" },
    { label: "Comps", percent: 8, color: "rgba(192,132,252,0.85)" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", paddingTop: 52, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "6px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: SIGNAL,
              boxShadow: `0 0 12px ${SIGNAL}`,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: "0.18em", color: SIGNAL, textTransform: "uppercase" }}>Live</span>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#fafafa", letterSpacing: "-0.03em", lineHeight: 1 }}>Tonight</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {["◎", "≡"].map((g, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                width: 26,
                height: 26,
                borderRadius: 9,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "#a1a1aa",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Revenue hero card */}
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "radial-gradient(120% 90% at 0% 0%, rgba(75,250,148,0.18) 0%, transparent 55%), linear-gradient(160deg, #0e1110 0%, #060706 100%)",
            padding: "14px 14px 6px",
            boxShadow: "0 26px 50px -32px rgba(0,0,0,0.95)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div>
              <p style={{ margin: 0, fontSize: 7, fontWeight: 900, letterSpacing: "0.18em", color: "#a1a1aa", textTransform: "uppercase" }}>
                Revenue · tonight
              </p>
              <p style={{ margin: "5px 0 0", fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>
                $1,847.<span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>00</span>
              </p>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                fontSize: 8,
                fontWeight: 900,
                color: SIGNAL,
                background: "rgba(75,250,148,0.14)",
                border: "1px solid rgba(75,250,148,0.35)",
                borderRadius: 999,
                padding: "3px 7px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              ▲ 22%
            </span>
          </div>

          <svg viewBox="0 0 168 42" preserveAspectRatio="none" style={{ display: "block", marginTop: 12, width: "100%", height: 56 }}>
            <defs>
              <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4BFA94" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4BFA94" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${sparkPath} L168 42 L0 42 Z`} fill="url(#sparkFill)" />
            <path d={sparkPath} fill="none" stroke={SIGNAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="168" cy="4" r="2.6" fill={SIGNAL} />
          </svg>
          <p style={{ margin: "2px 0 0", fontSize: 7, fontWeight: 700, color: "#71717a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Last 6 hours
          </p>
        </div>

        {/* 3 stat tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[
            { label: "Sold", value: "187", sub: "of 220" },
            { label: "In room", value: "127", sub: "scanned" },
            { label: "Waitlist", value: "34", sub: "wanting in" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "#101012",
                padding: "8px 9px",
              }}
            >
              <p style={{ margin: 0, fontSize: 6.5, fontWeight: 900, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ margin: "4px 0 1px", fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: 7, color: "#52525b", letterSpacing: "0.04em" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Sales mix bar */}
        <div
          style={{
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "#101012",
            padding: "10px 11px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: "0.14em", color: "#a1a1aa", textTransform: "uppercase" }}>Sales mix</span>
            <span style={{ fontSize: 7, fontWeight: 700, color: "#52525b", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live</span>
          </div>
          <div style={{ display: "flex", height: 8, borderRadius: 999, overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
            {bars.map((b) => (
              <span key={b.label} style={{ width: `${b.percent}%`, background: b.color }} aria-hidden />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, gap: 6 }}>
            {bars.map((b) => (
              <span key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: 2, background: b.color }} aria-hidden />
                <span style={{ fontSize: 7, fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {b.label} {b.percent}%
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Payout pill */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            borderRadius: 14,
            padding: "10px 12px",
            background: `linear-gradient(90deg, ${SIGNAL}, #7dffc0)`,
            boxShadow: "0 18px 36px -16px rgba(75,250,148,0.55)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: "0.18em", color: "rgba(0,0,0,0.55)", textTransform: "uppercase" }}>Payout ready</span>
            <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: "-0.02em", color: "#0a0a0a" }}>$1,724.18</span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.12em", color: "#0a0a0a", textTransform: "uppercase" }}>
            Withdraw →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   RIGHT SCREEN: Share link preview (iMessage style)
   ────────────────────────────────────────────────────────────────── */
function ShareLinkScreen() {
  const flyer =
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80";
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", paddingTop: 52, display: "flex", flexDirection: "column" }}>
      {/* iMessage header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span aria-hidden style={{ fontSize: 14, color: "#0a84ff" }}>‹</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(140deg, #fb923c 0%, #ef4444 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 9,
            }}
            aria-hidden
          >
            JR
          </div>
          <span style={{ fontSize: 8, fontWeight: 600, color: "#fafafa", letterSpacing: "-0.01em" }}>Jordan</span>
        </div>
        <span aria-hidden style={{ fontSize: 12, color: "#0a84ff" }}>⓵</span>
      </div>

      <div style={{ flex: 1, minHeight: 0, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Incoming bubble */}
        <div style={{ alignSelf: "flex-start", maxWidth: "78%", background: "#2c2c2e", color: "#fff", borderRadius: 16, padding: "7px 11px", fontSize: 10, fontWeight: 500 }}>
          drop the link
        </div>

        {/* Outgoing rich link card */}
        <div style={{ alignSelf: "flex-end", maxWidth: "82%", display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#0f0f11",
              boxShadow: "0 14px 28px -18px rgba(0,0,0,0.9)",
            }}
          >
            {/* Flyer preview */}
            <div style={{ position: "relative", height: 122, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- in-phone marketing still */}
              <img
                src={flyer}
                alt=""
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%", display: "block" }}
                decoding="async"
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
                }}
              />
              <div style={{ position: "absolute", top: 8, left: 8 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 7px",
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: SIGNAL, boxShadow: `0 0 6px ${SIGNAL}` }} aria-hidden />
                  <span style={{ fontSize: 6.5, fontWeight: 900, letterSpacing: "0.16em", color: "#fafafa", textTransform: "uppercase" }}>Live tonight</span>
                </span>
              </div>
              <div style={{ position: "absolute", left: 10, right: 10, bottom: 8 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
                  SoHo Welcome Back
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                  Fri, Aug 29 · 10 PM · NYC
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 11px", background: "#0a0a0a" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#a1a1aa", letterSpacing: "-0.01em" }}>rage.events</span>
              <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: "0.12em", color: SIGNAL, textTransform: "uppercase" }}>Get ticket</span>
            </div>
          </div>
          <div style={{ alignSelf: "flex-end", background: "#0a84ff", color: "#fff", borderRadius: 16, padding: "6px 11px", fontSize: 10, fontWeight: 600 }}>
            tonight, send pls
          </div>
          <span style={{ alignSelf: "flex-end", fontSize: 7, fontWeight: 700, color: "#52525b", letterSpacing: "0.08em", textTransform: "uppercase" }}>Delivered · iMessage</span>
        </div>

        {/* Incoming reply */}
        <div style={{ alignSelf: "flex-start", background: "#2c2c2e", color: "#fff", borderRadius: 16, padding: "7px 11px", fontSize: 11, fontWeight: 700, letterSpacing: "-0.01em" }}>
          im in
        </div>

        {/* Footer share stat */}
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              borderRadius: 14,
              padding: "8px 11px",
              background: "rgba(75,250,148,0.08)",
              border: "1px solid rgba(75,250,148,0.28)",
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 7, fontWeight: 900, letterSpacing: "0.14em", color: SIGNAL, textTransform: "uppercase" }}>Shared today</p>
              <p style={{ margin: "3px 0 0", fontSize: 12, fontWeight: 900, color: "#fafafa", letterSpacing: "-0.02em" }}>38× · 14 tickets</p>
            </div>
            <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: "0.12em", color: SIGNAL, textTransform: "uppercase" }}>
              Copy →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Section
   ────────────────────────────────────────────────────────────────── */
export function HomeAppShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-black pt-24 sm:pt-32">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[520px]"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(75,250,148,0.10), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4BFA94]">Run the room</p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            From flyer
            <br />
            to door.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-zinc-400">
            Sell tickets in a tap. Scan check-ins live. Watch the night fund itself. Built for college nights, free to download.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/create-event"
              className="inline-flex h-12 items-center rounded-full bg-white px-8 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-200"
              style={{ boxShadow: "0 0 30px -6px rgba(255,255,255,0.35)" }}
            >
              Create an event
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center rounded-full border border-white/[0.18] px-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/40"
            >
              Login →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 3-phone display */}
      <div className="relative z-10 mt-16 hidden h-[640px] items-end justify-center overflow-visible min-[740px]:flex">
        {/* LEFT: door scan */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 60, rotateZ: -8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateZ: -6 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
          style={{
            transform: "translateY(48px)",
            transformOrigin: "bottom center",
            zIndex: 1,
          }}
          className="-mr-4 md:-mr-8 lg:-mr-12"
        >
          <div className="origin-bottom-right scale-[0.62] md:scale-[0.7] lg:scale-[0.78]">
            <PhoneShell>
              <DoorScanScreen />
            </PhoneShell>
          </div>
        </motion.div>

        {/* CENTER: tonight live */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 80 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ zIndex: 3 }}
          className="relative"
        >
          <PhoneShell>
            <TonightLiveScreen />
          </PhoneShell>
        </motion.div>

        {/* RIGHT: share */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 60, rotateZ: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateZ: 6 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
          style={{
            transform: "translateY(48px)",
            transformOrigin: "bottom center",
            zIndex: 1,
          }}
          className="-ml-4 md:-ml-8 lg:-ml-12"
        >
          <div className="origin-bottom-left scale-[0.62] md:scale-[0.7] lg:scale-[0.78]">
            <PhoneShell>
              <ShareLinkScreen />
            </PhoneShell>
          </div>
        </motion.div>
      </div>

      {/* mobile: mirror desktop overlap */}
      <div className="relative z-10 mt-10 h-[440px] overflow-hidden min-[740px]:hidden">
        <div className="flex h-full items-end justify-center">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24, rotateZ: -8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateZ: -6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="-mr-24 translate-y-9"
            style={{ zIndex: 1 }}
          >
            <div className="origin-bottom-right scale-[0.52]">
              <PhoneShell>
                <DoorScanScreen />
              </PhoneShell>
            </div>
          </motion.div>
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.03 }}
            className="relative"
            style={{ zIndex: 3 }}
          >
            <div className="origin-bottom scale-[0.62]">
              <PhoneShell>
                <TonightLiveScreen />
              </PhoneShell>
            </div>
          </motion.div>
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24, rotateZ: 8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateZ: 6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="-ml-24 translate-y-9"
            style={{ zIndex: 1 }}
          >
            <div className="origin-bottom-left scale-[0.52]">
              <PhoneShell>
                <ShareLinkScreen />
              </PhoneShell>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
