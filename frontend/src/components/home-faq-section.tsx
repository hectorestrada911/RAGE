"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaqAccordion, type FaqAccordionItem } from "@/components/faq-accordion";

const faqItems: FaqAccordionItem[] = [
  {
    q: "How do I get into RAGE events?",
    a: "Create an account, find your event, and check out in a few taps. Your QR lands in My tickets—turn brightness up at the door for a fast scan.",
  },
  {
    q: "Do I need a school email?",
    a: "For student-gated events, hosts may require a verified .edu so private campus nights stay student-only. General events may be open to any email.",
    id: "faq-edu-email",
  },
  {
    q: "Where do I find my ticket after checkout?",
    a: "Open My tickets. Every purchase is tied to your account with a live QR—no screenshots, no PDF hunting.",
  },
  {
    q: "What about refunds?",
    a: "Refund rules are set by each host. Check the event policy first, then reach out to support with your order details if you need help.",
  },
  {
    q: "I'm hosting. How do payouts work?",
    a: "Connect Stripe from your host dashboard, track orders in real time, and withdraw available balance there.",
  },
];

export function HomeFaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden border-y border-white/[0.06] bg-black py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 28%, rgba(75,250,148,0.12), transparent 40%), radial-gradient(circle at 88% 72%, rgba(40,80,255,0.08), transparent 44%)",
        }}
      />

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl text-left"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4BFA94]">FAQ</p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl">
            Frequently asked
            <br />
            questions
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Tickets, door check-in, payouts, and access—clear answers before you buy or host.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Tickets", "Access", "Refunds", "Hosts", "Support"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.1] bg-black/50 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl">
          <FaqAccordion items={faqItems} />
        </div>

        <div className="mt-12 flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="/create-event"
            className="inline-flex h-12 items-center rounded-full bg-[#4BFA94] px-8 text-[11px] font-bold uppercase tracking-[0.16em] text-black shadow-[0_16px_40px_-18px_rgba(75,250,148,0.55)] transition hover:bg-emerald-300"
          >
            Create event
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-12 items-center rounded-full border border-white/[0.14] bg-white/[0.03] px-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/[0.06]"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
