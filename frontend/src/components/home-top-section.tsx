"use client";

import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const cyclingPhrases = [
  "Your night.",
  "Your vibe.",
  "Your rage.",
  "Your scene.",
  "Your move.",
  "Your crowd.",
];

/* ─── scene data ─────────────────────────────────────────────────── */
const scenes = [
  {
    eyebrow: "Discover",
    line1: "Your campus.",
    line2: "Your night.",
    cycleWords: ["Your night.", "Your vibe.", "Your scene."],
    body: "Every party, show, and event near you, curated by students, for students.",
    leftTag: "BUILT FOR\nCOLLEGE NIGHTS",
    rightTag: "WHERE IT\nDROPS FIRST",
    cta: { label: "Sample event", href: "/demo" },
  },
  {
    eyebrow: "Host on RAGE",
    line1: "Publish fast.",
    line2: "Sell clean.",
    cycleWords: ["Sell clean.", "Scan fast.", "Own the door."],
    body: "One flow for flyer, tickets, and QR check-in — so the week-of chaos doesn’t live in your DMs.",
    leftTag: "BUILT FOR\nCOLLEGE NIGHTS",
    rightTag: "MOBILE\nFIRST",
    cta: { label: "Register", href: "/signup" },
  },
  {
    eyebrow: "Door flow",
    line1: "Crowd in.",
    line2: "Friction out.",
    cycleWords: ["Friction out.", "Scan in.", "Go fast."],
    body: "QR tickets on your phone, scanned at the door in seconds. Zero paper, zero lines.",
    leftTag: "SCAN.\nGO. DONE.",
    rightTag: "OFFLINE\nREADY",
    cta: { label: "Create event", href: "/create-event" },
  },
];

/* Discover-style feed tokens (match product mock: black canvas, iOS-like cards, lime signal) */
const DISCOVER_BG = "#000000";
const DISCOVER_CARD = "#1c1c1e";
const SIGNAL = "#4BFA94";

/* ─── phone screen 1: event feed (Discover) ─────────────────────── */
function FeedScreen({ progress }: { progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const tabs = [
    { label: "Tonight", active: true },
    { label: "Near me", active: false },
    { label: "Music", active: false },
    { label: "Greek", active: false },
  ];
  const upcoming = [
    {
      tag: "PARTY",
      tc: "#facc15",
      tagBg: "rgba(250,204,21,0.18)",
      title: "Pre-game @ Theta",
      meta: "9PM · 2.3 mi away",
      going: 47,
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=70",
    },
    {
      tag: "RAVE",
      tc: "#c084fc",
      tagBg: "rgba(192,132,252,0.18)",
      title: "Rooftop DJ Set",
      meta: "Fri · Riverside Deck",
      going: 89,
      img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=300&q=70",
    },
  ];

  /* staggered entrance */
  const heroY = useTransform(progress, [0.015, 0.115], [22, 0]);
  const heroO = useTransform(progress, [0.015, 0.115], [0, 1]);
  const y1 = useTransform(progress, [0.060, 0.160], [18, 0]);
  const y2 = useTransform(progress, [0.085, 0.185], [18, 0]);
  const o1 = useTransform(progress, [0.060, 0.160], [0, 1]);
  const o2 = useTransform(progress, [0.085, 0.185], [0, 1]);
  const cardYs = [y1, y2];
  const cardOpacities = [o1, o2];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: DISCOVER_BG,
        paddingTop: 56,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* title row + avatar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 14px 8px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.18em", color: "#52525b", textTransform: "uppercase" }}>For you · NYU</span>
          <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05 }}>Discover</span>
        </div>
        <div style={{ position: "relative", width: 30, height: 30, borderRadius: 999, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(145deg, #3f3f46 0%, #18181b 100%)",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: SIGNAL,
              border: "2px solid #000",
            }}
          />
        </div>
      </div>

      {/* compact pill tabs */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: 6,
          padding: "0 12px 8px",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {tabs.map((t) => (
          <span
            key={t.label}
            style={{
              flexShrink: 0,
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.04em",
              color: t.active ? "#000" : "#a1a1aa",
              background: t.active ? SIGNAL : "rgba(255,255,255,0.04)",
              border: t.active ? "1px solid rgba(0,0,0,0)" : "1px solid rgba(255,255,255,0.08)",
              padding: "5px 10px",
              borderRadius: 999,
              textTransform: "uppercase",
            }}
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* scrollable area */}
      <div className="no-scrollbar" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "6px 12px 60px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* HERO featured event card */}
        <motion.div
          style={{
            y: heroY,
            opacity: heroO,
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 50px -28px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.05)",
            background: "#0a0a0a",
            height: 196,
            flexShrink: 0,
          }}
        >
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
            transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- in-phone marketing still */}
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
              alt=""
              width={600}
              height={800}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%", display: "block" }}
              decoding="async"
            />
          </motion.div>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 110% 70% at 50% -10%, rgba(75,250,148,0.18), transparent 50%), linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, transparent 72%)",
              pointerEvents: "none",
            }}
          />

          {/* Top chips */}
          <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 8px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <motion.span
                aria-hidden
                style={{ width: 6, height: 6, borderRadius: "50%", background: SIGNAL, boxShadow: `0 0 8px ${SIGNAL}` }}
                animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={reduceMotion ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: "0.16em", color: "#fafafa", textTransform: "uppercase" }}>Live tonight</span>
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 8px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
              aria-hidden
            >
              <svg width="8" height="9" viewBox="0 0 24 24" fill="none" stroke="#fafafa" strokeWidth="2.2">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </span>
          </div>

          {/* Bottom content */}
          <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                alignSelf: "flex-start",
                display: "inline-block",
                background: "rgba(75,250,148,0.22)",
                color: SIGNAL,
                fontSize: 7,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                borderRadius: 6,
                padding: "3px 7px",
              }}
            >
              Featured · Music
            </span>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05, textShadow: "0 2px 18px rgba(0,0,0,0.7)" }}>
              Campus Lights Fest
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <p style={{ margin: 0, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.86)" }}>10:00 PM · Main Stage</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ display: "inline-flex", marginLeft: 0 }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: ["#a78bfa", "#f472b6", "#60a5fa"][i],
                        border: "1.5px solid #050505",
                        marginLeft: i === 0 ? 0 : -4,
                      }}
                      aria-hidden
                    />
                  ))}
                </span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.78)" }}>156 going</span>
              </div>
            </div>
            <div
              style={{
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                borderRadius: 999,
                padding: "8px 10px",
                background: `linear-gradient(90deg, ${SIGNAL}, #7dffc0)`,
                boxShadow: "0 12px 26px -14px rgba(75,250,148,0.55)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.08em", color: "#0a0a0a", textTransform: "uppercase" }}>Get ticket · $15</span>
            </div>
          </div>
        </motion.div>

        {/* Upcoming row label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 2 }}>
          <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: "0.16em", color: "#a1a1aa", textTransform: "uppercase" }}>Up next</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: "#52525b" }}>See all</span>
        </div>

        {upcoming.map((item, i) => (
          <motion.div
            key={i}
            style={{
              y: cardYs[i],
              opacity: cardOpacities[i],
              background: DISCOVER_CARD,
              borderRadius: 14,
              padding: "9px 10px 9px 9px",
              display: "flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 10px 22px -16px rgba(0,0,0,0.85)",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                flexShrink: 0,
                backgroundImage: `linear-gradient(160deg, rgba(0,0,0,0.12), rgba(0,0,0,0.42)), url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  background: item.tagBg,
                  color: item.tc,
                  fontSize: 7,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderRadius: 5,
                  padding: "2px 5px",
                }}
              >
                {item.tag}
              </span>
              <p style={{ margin: "3px 0 1px", fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{item.title}</p>
              <p style={{ margin: 0, fontSize: 9, color: "#737373" }}>{item.meta}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: SIGNAL, letterSpacing: "-0.02em" }}>{item.going}</span>
              <span style={{ fontSize: 7, fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Going</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* bottom tab bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 22,
          padding: "0 8px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            background: "rgba(10,10,10,0.92)",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "8px 4px 10px",
            boxShadow: "0 -16px 40px rgba(0,0,0,0.5)",
          }}
        >
          {[
            { label: "Discover", active: true, icon: "◎" },
            { label: "Saved", active: false, icon: "♡" },
            { label: "My Events", active: false, icon: "▦" },
            { label: "Messages", active: false, icon: "✉" },
            { label: "Profile", active: false, icon: "◉" },
          ].map((tab) => (
            <div key={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 44 }}>
              <span style={{ fontSize: 13, color: tab.active ? SIGNAL : "#52525b", lineHeight: 1 }} aria-hidden>
                {tab.icon}
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: tab.active ? 700 : 500,
                  color: tab.active ? SIGNAL : "#52525b",
                  letterSpacing: "0.02em",
                }}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── phone screen 2: Create Event — polished host editor (step 2/4) ─ */
function HostCreateEventPreviewScreen({ progress }: { progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const headerOpacity = useTransform(progress, [0.28, 0.40], [0, 1]);
  const coverOpacity = useTransform(progress, [0.30, 0.44], [0, 1]);
  const coverY = useTransform(progress, [0.30, 0.44], [22, 0]);
  const fieldsOpacity = useTransform(progress, [0.36, 0.50], [0, 1]);
  const fieldsY = useTransform(progress, [0.36, 0.50], [18, 0]);
  const footerOpacity = useTransform(progress, [0.42, 0.56], [0, 1]);
  const progressWidth = useTransform(progress, [0.34, 0.62], ["12%", "50%"]);

  const SIGNAL = "#4BFA94";
  const ink = "#0c0c0e";
  const fieldBg = "#141416";
  const fieldBorder = "rgba(255,255,255,0.07)";
  const fieldBorderActive = "rgba(75,250,148,0.35)";

  return (
    <div style={{ position: "absolute", inset: 0, background: ink, paddingTop: 52, display: "flex", flexDirection: "column" }}>
      {/* App bar */}
      <motion.div
        style={{
          opacity: headerOpacity,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 16px 12px",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.18em", color: "#52525b", textTransform: "uppercase" }}>Host on RAGE</span>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.02em", color: "#fafafa" }}>Create event</span>
        </div>
        <span
          aria-hidden
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            background: `linear-gradient(180deg, ${SIGNAL} 0%, #6dffae 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 18px -4px rgba(75,250,148,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
            <path d="M1 5.2L4.2 8.4L11 1" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.div>

      {/* Step progress */}
      <motion.div
        style={{ opacity: headerOpacity, flexShrink: 0, padding: "0 16px 10px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.16em", color: "#a1a1aa", textTransform: "uppercase" }}>Step 2 of 4</span>
          <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.1em", color: SIGNAL, textTransform: "uppercase" }}>Draft saved</span>
        </div>
        <div style={{ position: "relative", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <motion.div
            style={{
              width: progressWidth,
              height: "100%",
              borderRadius: 2,
              background: `linear-gradient(90deg, ${SIGNAL}, #7dffc0)`,
              boxShadow: "0 0 12px rgba(75,250,148,0.55)",
            }}
          />
        </div>
      </motion.div>

      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 16px 78px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Cover — vertical poster aspect, like a real flyer */}
        <motion.div
          style={{
            opacity: coverOpacity,
            y: coverY,
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 26px 50px -32px rgba(0,0,0,0.95)",
            background: "#0a0a0a",
            height: 202,
            flexShrink: 0,
          }}
        >
          {/* Wider than frame so we crop harsh green stage-light columns at photo edges */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "-7%",
              right: "-7%",
            }}
            animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
            transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- in-phone marketing still */}
            <img
              src="/marketing-live-event.png"
              alt="Event cover preview while creating an event"
              width={800}
              height={1200}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 38%", display: "block" }}
              decoding="async"
            />
          </motion.div>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, transparent 14%, transparent 86%, rgba(0,0,0,0.55) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
          {/* Replace cover chip */}
          <div
            style={{
              position: "absolute",
              left: 10,
              bottom: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 9px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fafafa" strokeWidth="2.2" aria-hidden>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.12em", color: "#fafafa", textTransform: "uppercase" }}>Replace cover</span>
          </div>
          {/* Live preview chip */}
          <div
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 8px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: SIGNAL, boxShadow: `0 0 6px ${SIGNAL}` }} aria-hidden />
            <span style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: "0.14em", color: "#fafafa", textTransform: "uppercase" }}>Live preview</span>
          </div>
        </motion.div>

        {/* Form fields */}
        <motion.div style={{ opacity: fieldsOpacity, y: fieldsY, display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Title — active */}
          <div
            style={{
              position: "relative",
              borderRadius: 14,
              border: `1px solid ${fieldBorderActive}`,
              background: fieldBg,
              padding: "10px 12px 11px",
              boxShadow: "0 0 0 3px rgba(75,250,148,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ margin: 0, fontSize: 7, fontWeight: 800, letterSpacing: "0.14em", color: "#a1a1aa", textTransform: "uppercase" }}>Title</p>
              <span style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.08em", color: SIGNAL, textTransform: "uppercase" }}>● Editing</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.03em", color: "#fafafa" }}>SoHo welcome back</span>
              <motion.span
                aria-hidden
                style={{ display: "inline-block", width: 1.5, height: 12, background: SIGNAL, borderRadius: 1 }}
                animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                transition={reduceMotion ? undefined : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Date + time row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div
              style={{
                borderRadius: 14,
                border: `1px solid ${fieldBorder}`,
                background: fieldBg,
                padding: "9px 11px",
              }}
            >
              <p style={{ margin: 0, fontSize: 7, fontWeight: 800, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase" }}>Date</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fafafa", letterSpacing: "-0.02em" }}>Fri, Aug 29</span>
              </div>
            </div>
            <div
              style={{
                borderRadius: 14,
                border: `1px solid ${fieldBorder}`,
                background: fieldBg,
                padding: "9px 11px",
              }}
            >
              <p style={{ margin: 0, fontSize: 7, fontWeight: 800, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase" }}>Time</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15 14" />
                </svg>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fafafa", letterSpacing: "-0.02em" }}>10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div
            style={{
              borderRadius: 14,
              border: `1px solid ${fieldBorder}`,
              background: fieldBg,
              padding: "9px 11px",
            }}
          >
            <p style={{ margin: 0, fontSize: 7, fontWeight: 800, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase" }}>Location</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fafafa", letterSpacing: "-0.02em" }}>121 Spring St · NYC</span>
            </div>
          </div>

          {/* Tickets */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 14,
              border: `1px solid ${fieldBorder}`,
              background: fieldBg,
              padding: "9px 11px",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 7, fontWeight: 800, letterSpacing: "0.14em", color: "#71717a", textTransform: "uppercase" }}>Tickets</p>
              <p style={{ margin: "4px 0 0", fontSize: 10, fontWeight: 700, color: "#fafafa", letterSpacing: "-0.02em" }}>GA · $15</p>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 8px",
                borderRadius: 999,
                background: "rgba(75,250,148,0.1)",
                border: `1px solid ${SIGNAL}`,
                fontSize: 7,
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: SIGNAL,
                textTransform: "uppercase",
              }}
            >
              + Tier
            </span>
          </div>
        </motion.div>

      </div>

      {/* Sticky CTA pinned to bottom of phone */}
      <motion.div
        style={{
          opacity: footerOpacity,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 12,
          padding: "8px 16px 0",
          background: "linear-gradient(to top, rgba(12,12,14,1) 35%, rgba(12,12,14,0))",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 14,
            overflow: "hidden",
            background: `linear-gradient(90deg, ${SIGNAL}, #7dffc0)`,
            boxShadow: "0 18px 36px -14px rgba(75,250,148,0.55)",
          }}
        >
          <span
            style={{
              display: "block",
              padding: "11px 12px",
              textAlign: "center",
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#0a0a0a",
            }}
          >
            Continue → tickets
          </span>
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 44,
              background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.32), rgba(255,255,255,0))",
              transform: "skewX(-16deg)",
            }}
            animate={reduceMotion ? undefined : { x: [-50, 240] }}
            transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── phone screen 3: QR ticket ─────────────────────────────────── */
function TicketScreen({ progress }: { progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const qrScale = useTransform(progress, [0.64, 0.78], [0.7, 1]);
  const qrOpacity = useTransform(progress, [0.64, 0.74], [0, 1]);
  const headY = useTransform(progress, [0.62, 0.74], [12, 0]);
  const headOpacity = useTransform(progress, [0.62, 0.72], [0, 1]);
  const badgeY = useTransform(progress, [0.72, 0.84], [14, 0]);
  const badgeOpacity = useTransform(progress, [0.72, 0.82], [0, 1]);
  const scanOpacity = useTransform(progress, [0.72, 0.78, 0.9, 1], [0, 1, 1, 0.3]);

  const qrRows = [
    "111111100001011111111",
    "100000101111010000001",
    "101110100010010111101",
    "101110101001010111101",
    "101110100111010111101",
    "100000101010010000001",
    "111111101010011111111",
    "000000000111000000000",
    "100101111010111010011",
    "011001001111010001110",
    "101110111001111000101",
    "001011000111001110100",
    "110100111000111011001",
    "000000001101000001000",
    "111111101001011111010",
    "100000101111010000111",
    "101110101001110111101",
    "101110100110010111001",
    "101110101010011011101",
    "100000100111001001001",
    "111111101001010111111",
  ];
  const qrModules = qrRows.join("").split("");
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 24px 24px" }}>
      <motion.p style={{ opacity: headOpacity, y: headY, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#52525b" }}>
        Your ticket
      </motion.p>
      <motion.p style={{ opacity: headOpacity, y: headY, marginTop: 6, fontSize: 17, fontWeight: 900, color: "#fff", textAlign: "center", lineHeight: 1.2 }}>
        Campus Lights Fest
      </motion.p>
      <motion.p style={{ opacity: headOpacity, y: headY, fontSize: 11, color: "#52525b" }}>
        Tonight · Main Stage · GA
      </motion.p>
      <motion.div
        style={{
          opacity: qrOpacity,
          scale: qrScale,
          marginTop: 14,
          width: 152,
          height: 152,
          background: "linear-gradient(180deg, #090b12 0%, #05070d 100%)",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 14px 28px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.035)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(21, 1fr)", gap: 1.2, width: "100%", height: "100%" }}>
          {qrModules.map((cell, i) => (
            <div key={i} style={{ background: cell === "1" ? "#f5f8ff" : "#0a1020", borderRadius: 0.8 }} />
          ))}
        </div>
        <motion.div
          aria-hidden
          style={{
            opacity: scanOpacity,
            position: "absolute",
            left: 12,
            right: 12,
            top: 12,
            height: 3,
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(75,250,148,0), rgba(75,250,148,0.95), rgba(75,250,148,0))",
            boxShadow: "0 0 10px rgba(75,250,148,0.7)",
          }}
          animate={reduceMotion ? undefined : { y: [0, 118, 0] }}
          transition={reduceMotion ? undefined : { duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div style={{ opacity: badgeOpacity, y: badgeY, marginTop: 14, display: "flex", alignItems: "center", gap: 7, background: "rgba(75,250,148,0.12)", borderRadius: 999, padding: "7px 16px" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4BFA94" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#4BFA94" }}>VALID · SCAN TO ENTER</span>
      </motion.div>
      <p style={{ marginTop: 14, fontSize: 10, color: "#3f3f46", textAlign: "center", lineHeight: 1.6 }}>Show this at the door.<br />Works offline.</p>
    </div>
  );
}

/* ─── titanium phone shell ──────────────────────────────────────── */
export function PhoneShell({ children, w = 300, h = 620 }: { children: ReactNode; w?: number; h?: number }) {
  const frameW = 7;
  const innerR = 50;
  const frameR = 58;

  const buttonGrad = "linear-gradient(to bottom, #2c2c2e 0%, #4d4d50 40%, #4d4d50 60%, #2c2c2e 100%)";

  return (
    <div style={{ position: "relative", width: w, height: h, flexShrink: 0 }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: frameR,
        background: "#0b0b0d",
        boxShadow: [
          "inset 0 0 0 1px rgba(255,255,255,0.10)",
          "inset 0 1.5px 0 rgba(255,255,255,0.06)",
          "0 30px 80px -24px rgba(0,0,0,0.85)",
        ].join(", "),
      }} />

      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: frameR, pointerEvents: "none",
        background: "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 6%, rgba(255,255,255,0) 94%, rgba(255,255,255,0.07) 100%)",
      }} />

      {/* volume notches */}
      <div style={{ position: "absolute", left: -4, top: 100, width: 4, height: 26, borderRadius: 2, background: buttonGrad, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), -1px 0 1.5px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", left: -4, top: 138, width: 4, height: 44, borderRadius: 2, background: buttonGrad, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), -1px 0 1.5px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", left: -4, top: 192, width: 4, height: 44, borderRadius: 2, background: buttonGrad, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), -1px 0 1.5px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", right: -4, top: 162, width: 4, height: 72, borderRadius: 2, background: buttonGrad, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 1px 0 1.5px rgba(0,0,0,0.6)" }} />

      <div style={{
        position: "absolute",
        top: frameW, left: frameW,
        right: frameW, bottom: frameW,
        borderRadius: innerR,
        overflow: "hidden",
        background: "#000",
        boxShadow: "inset 0 0 0 1.5px #000, inset 0 0 22px rgba(0,0,0,0.6)",
      }}>
        {/* status bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px 0" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="white"><rect x="0" y="4" width="3" height="7" rx="1" /><rect x="4" y="2.5" width="3" height="8.5" rx="1" /><rect x="8" y="1" width="3" height="10" rx="1" /><rect x="12" y="0" width="3" height="11" rx="1" /></svg>
          </div>
        </div>

        {/* Dynamic island */}
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 118, height: 32, borderRadius: 20, background: "#000", zIndex: 30, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}>
          <div style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #1a4a6e 0%, #0a1828 55%, #000 100%)", boxShadow: "inset 0 0 1px rgba(120,180,220,0.45)" }}>
            <div style={{ position: "absolute", top: 1, left: 1, width: 2.5, height: 2.5, borderRadius: "50%", background: "rgba(180,220,255,0.65)", filter: "blur(0.3px)" }} />
          </div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #2a2a2c 0%, #050505 70%)", boxShadow: "inset 0 0 1px rgba(255,255,255,0.08)" }} />
        </div>

        {children}

        {/* Home bar */}
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 120, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.95)", boxShadow: "0 0 8px rgba(255,255,255,0.3)" }} />
      </div>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────── */
export function HomeTopSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setPhraseIdx(i => (i + 1) % cyclingPhrases.length), 2200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Use a manual offsetTop-based calculation instead of useScroll({target,offset}).
  // useScroll with target can mis-measure on certain layouts (Framer warns
  // when the scroll container isn't non-static), so compute progress directly
  // from window scrollY against the section's measured top + scrollable range.
  const { scrollY } = useScroll();
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionRange, setSectionRange] = useState(2400);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const recalc = () => {
      setSectionTop(el.offsetTop);
      setSectionRange(Math.max(1, el.offsetHeight - window.innerHeight));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  const progress = useTransform(
    scrollY,
    [sectionTop, sectionTop + sectionRange],
    [0, 1],
    { clamp: true }
  );

  /** Stacked scene columns share one screen position; only the visible scene should receive clicks. */
  function sceneIndexFromScrollProgress(v: number) {
    if (v < 0.29) return 0;
    if (v < 0.61) return 1;
    return 2;
  }
  const [pointerScene, setPointerScene] = useState(0);
  useLayoutEffect(() => {
    setPointerScene(sceneIndexFromScrollProgress(progress.get()));
  }, [progress, sectionTop, sectionRange]);
  useMotionValueEvent(progress, "change", (v) => {
    setPointerScene(sceneIndexFromScrollProgress(v));
  });

  /* scene fades */
  const s1 = useTransform(progress, [0, 0.20, 0.30], [1, 1, 0]);
  const s2 = useTransform(progress, [0.24, 0.34, 0.54, 0.64], [0, 1, 1, 0]);
  const s3 = useTransform(progress, [0.56, 0.66, 1], [0, 1, 1]);

  /* phone screens */
  const p1 = useTransform(progress, [0, 0.22, 0.32], [1, 1, 0]);
  const p2 = useTransform(progress, [0.26, 0.36, 0.56, 0.66], [0, 1, 1, 0]);
  const p3 = useTransform(progress, [0.58, 0.68, 1], [0, 1, 1]);

  /*
   * Phone is VISIBLE on initial load — angled at bottom of screen like doorlist.
   * Rises and straightens as user scrolls. rotateZ starts tilted, normalises.
   */
  const phoneY       = useTransform(progress, [0, 0.28, 1],   [320, 0, -16]);
  const phoneRotateX = useTransform(progress, [0, 0.28, 1],   [-10, 0, 2]);
  const phoneRotateY = useTransform(progress, [0, 0.28, 0.7, 1], [-8, 0, -5, -10]);
  const phoneRotateZ = useTransform(progress, [0, 0.28, 1],   [-6, 0, 3]);

  /* hero headline visible immediately, fades out as side text appears */
  const heroOpacity = useTransform(progress, [0, 0.22, 0.40], [1, 1, 0]);
  const heroY       = useTransform(progress, [0.22, 0.40], [0, -28]);

  /* side text slides in as phone settles */
  const sideOpacity = useTransform(progress, [0.24, 0.44], [0, 1]);
  const sideXL      = useTransform(progress, [0.24, 0.44], [-32, 0]);
  const sideXR      = useTransform(progress, [0.24, 0.44], [32, 0]);

  /* glow behind phone */
  const glowOpacity = useTransform(progress, [0, 0.30, 0.7, 1], [0.4, 0.9, 0.85, 0.5]);

  /* scroll hint */
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  /* Above phone: fill empty space after hero fades. On lg+, fade out as side columns take over. */
  const digestMount = useTransform(progress, [0.24, 0.36, 1], [0, 1, 1]);
  const digestDesktopOpacity = useTransform([digestMount, sideOpacity], ([m, s]) => {
    const mount = typeof m === "number" ? m : 0;
    const side = typeof s === "number" ? s : 0;
    return mount * (1 - Math.min(1, side * 1.05));
  });

  const sceneOps = [s1, s2, s3];
  const phoneOps = [p1, p2, p3];

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ minHeight: "320vh" }}
    >
      <div className="sticky top-0 h-screen" style={{ overflow: "clip" }}>

        {/* ambient glows — radial gradients (no `filter: blur`) so we don't repaint on scroll */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 12% 25%, rgba(75,250,148,0.06), transparent 38%), radial-gradient(circle at 88% 88%, rgba(0,0,254,0.05), transparent 40%)",
          }}
        />

        {/* ── MOBILE / TABLET: scene headline above phone (lg+ use side columns instead) ── */}
        <motion.div
          style={{ opacity: digestMount }}
          className="pointer-events-none absolute inset-x-0 z-[11] hidden max-lg:block max-lg:top-[calc(env(safe-area-inset-top)+4.25rem)]"
        >
          <div className="relative mx-auto min-h-0 w-full max-w-md px-5 sm:min-h-[5.5rem]">
            {scenes.map((scene, i) => (
              <motion.div
                key={scene.eyebrow}
                className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
                style={{
                  opacity: sceneOps[i],
                  pointerEvents: pointerScene === i ? "auto" : "none",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#4BFA94]">{scene.eyebrow}</p>
                <h2 className="mt-1.5 text-2xl font-black uppercase leading-[0.92] tracking-[-0.03em] text-white sm:text-3xl">
                  {scene.line1}
                  <br />
                  <span className="bg-gradient-to-r from-[#4BFA94] to-emerald-300 bg-clip-text text-transparent">{scene.line2}</span>
                </h2>
                <Link
                  href={scene.cta.href}
                  className="mt-3 inline-flex h-10 items-center rounded-full bg-[#4BFA94] px-6 text-[10px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-emerald-300"
                  style={{ boxShadow: "0 0 20px -4px rgba(75,250,148,0.45)" }}
                >
                  {scene.cta.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: digestDesktopOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[max(3.5rem,7svh)] z-[11] hidden lg:block"
        >
          <div className="relative mx-auto min-h-[6rem] w-full max-w-lg px-8">
            {scenes.map((scene, i) => (
              <motion.div
                key={`dt-${scene.eyebrow}`}
                className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
                style={{
                  opacity: sceneOps[i],
                  pointerEvents: pointerScene === i ? "auto" : "none",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#4BFA94]">{scene.eyebrow}</p>
                <h2 className="mt-1 text-xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-2xl">
                  {scene.line1}{" "}
                  <span className="bg-gradient-to-r from-[#4BFA94] to-emerald-300 bg-clip-text text-transparent">{scene.line2}</span>
                </h2>
                <Link
                  href={scene.cta.href}
                  className="mt-2.5 inline-flex h-9 items-center rounded-full bg-[#4BFA94] px-5 text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:bg-emerald-300"
                  style={{ boxShadow: "0 0 16px -4px rgba(75,250,148,0.4)" }}
                >
                  {scene.cta.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── HERO HEADLINE — visible on load, fades as side text takes over ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-[clamp(5.25rem,9svh,7.5rem)] text-center lg:pt-[10vh]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4BFA94]">
            Discover
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Your campus.<br />
            <span className="relative inline-block overflow-hidden" style={{ minWidth: "8ch" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phraseIdx}
                  className="inline-block bg-gradient-to-r from-[#4BFA94] to-emerald-300 bg-clip-text text-transparent"
                  initial={{ y: "60%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {cyclingPhrases[phraseIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="mt-5 max-w-[280px] text-sm leading-relaxed text-zinc-500">
            Every party, show, and event near you, curated by students, for students.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center rounded-full bg-[#4BFA94] px-8 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-emerald-300"
              style={{ boxShadow: "0 0 32px -6px rgba(75,250,148,0.6)" }}
            >
              Register
            </Link>
            <Link
              href="/create-event"
              className="inline-flex h-12 items-center rounded-full border border-white/20 bg-white/[0.04] px-7 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-white/35 hover:bg-white/[0.07]"
            >
              Create event
            </Link>
          </div>
        </motion.div>

        {/* ── LEFT SIDE TEXT ── */}
        <div className="absolute top-1/2 z-10 hidden -translate-y-[60%] lg:block" style={{ left: "5vw" }}>
          <motion.div style={{ opacity: sideOpacity, x: sideXL }}>
            {scenes.map((scene, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: sceneOps[i],
                  position: i === 0 ? "relative" : "absolute",
                  top: i === 0 ? "auto" : 0,
                  left: i === 0 ? "auto" : 0,
                  pointerEvents: pointerScene === i ? "auto" : "none",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#4BFA94]">
                  {scene.eyebrow}
                </p>
                <h2 className="mt-2 w-[220px] text-2xl font-black uppercase leading-[0.92] tracking-[-0.03em] text-white lg:text-3xl">
                  {scene.line1}
                  <br />
                  <AnimatedTextCycle
                    words={scene.cycleWords ?? [scene.line2]}
                    interval={2200}
                    className="text-2xl font-black uppercase tracking-[-0.03em] text-white lg:text-3xl"
                  />
                </h2>
                <p className="mt-3 w-[200px] text-[12px] leading-relaxed text-zinc-500">
                  {scene.body}
                </p>
                <Link
                  href={scene.cta.href}
                  className="mt-5 inline-flex h-10 items-center rounded-full bg-[#4BFA94] px-6 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-emerald-300"
                  style={{ boxShadow: "0 0 20px -4px rgba(75,250,148,0.45)" }}
                >
                  {scene.cta.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT SIDE TAGS ── */}
        <div className="absolute top-1/2 z-10 hidden -translate-y-[60%] text-right lg:block" style={{ right: "5vw" }}>
          <motion.div style={{ opacity: sideOpacity, x: sideXR }}>
            {scenes.map((scene, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: sceneOps[i],
                  position: i === 0 ? "relative" : "absolute",
                  top: i === 0 ? "auto" : 0,
                  right: i === 0 ? "auto" : 0,
                }}
              >
                <p className="whitespace-pre text-right text-[10px] font-bold uppercase leading-[1.6] tracking-[0.22em] text-zinc-600">
                  {scene.rightTag}
                </p>
                <p className="mt-4 whitespace-pre text-right text-[10px] font-bold uppercase leading-[1.6] tracking-[0.22em] text-zinc-700">
                  {scene.leftTag}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── PHONE — visible on load at angle, rises and straightens on scroll ── */}
        <div className="absolute bottom-0 left-1/2 z-[5]" style={{ transform: "translateX(-50%)" }}>
          <motion.div
            aria-hidden
            style={{
              opacity: glowOpacity,
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: 560, height: 560,
              translate: "-50% 20%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(75,250,148,0.22), transparent 62%)",
              pointerEvents: "none",
              willChange: "opacity",
            }}
          />
          <div style={{ perspective: "1500px", transform: "translateZ(0)" }}>
            <motion.div
              style={
                reduceMotion
                  ? { transform: "translateZ(0)" }
                  : {
                      y: phoneY,
                      rotateX: phoneRotateX,
                      rotateY: phoneRotateY,
                      rotateZ: phoneRotateZ,
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }
              }
            >
              <PhoneShell>
                <motion.div style={{ opacity: phoneOps[0], position: "absolute", inset: 0, willChange: "opacity", transform: "translateZ(0)" }}>
                  <FeedScreen progress={progress} />
                </motion.div>
                <motion.div style={{ opacity: phoneOps[1], position: "absolute", inset: 0, willChange: "opacity", transform: "translateZ(0)" }}>
                  <HostCreateEventPreviewScreen progress={progress} />
                </motion.div>
                <motion.div style={{ opacity: phoneOps[2], position: "absolute", inset: 0, willChange: "opacity", transform: "translateZ(0)" }}>
                  <TicketScreen progress={progress} />
                </motion.div>
              </PhoneShell>
            </motion.div>
          </div>
        </div>

        {/* progress dots */}
        <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
          {phoneOps.map((op, i) => (
            <motion.div key={i} style={{ opacity: op }} className="h-1.5 w-1.5 rounded-full bg-[#4BFA94]" />
          ))}
        </div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
            Scroll
          </span>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-5 w-px rounded-full bg-zinc-600"
          />
        </motion.div>

      </div>
    </div>
  );
}
