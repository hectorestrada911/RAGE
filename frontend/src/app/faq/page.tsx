import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type FaqAccordionItem } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ · RAGE",
  description: "Answers to the most common questions about tickets, refunds, hosting, and account access on RAGE.",
};

const faqs: FaqAccordionItem[] = [
  {
    q: "How do I get into RAGE events?",
    a: "Create an account, find your event, and check out in a few taps. Your QR lands in My tickets. Turn brightness up at the door for a fast scan.",
  },
  {
    q: "Do I need a school email to use the app?",
    a: "For student-gated events, hosts may require a verified .edu so private campus nights stay student-only. Other events may be open to any email. Check the listing.",
    id: "faq-edu-email",
  },
  {
    q: "Where is my ticket after I buy?",
    a: "Go to My tickets. Every purchase is attached to your account with a live QR for door entry.",
  },
  {
    q: "Can I get a refund if I can't attend?",
    a: "Refunds are controlled by each event host. Open the event for policy details, then contact support with your order info if you need help.",
  },
  {
    q: "What happens if my QR doesn't scan?",
    a: "Door teams can validate your ticket from the host dashboard. Keep My tickets open with brightness up to speed up scanning.",
  },
  {
    q: "How do hosts get paid?",
    a: "Hosts connect payouts through Stripe and track sales, attendees, and orders in the dashboard.",
  },
  {
    q: "Can I create private invite-only events?",
    a: "Yes. Hosts can run student-gated flows and invite-specific access depending on how the event is set up.",
  },
  {
    q: "How fast does support reply?",
    a: "We usually respond within 24 hours on business days. Contact us at ragesupportpage@gmail.com.",
  },
];

export default function FaqPage() {
  return (
    <main className="relative overflow-hidden bg-black text-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 16%, rgba(75,250,148,0.11), transparent 42%), radial-gradient(circle at 82% 78%, rgba(40,80,255,0.09), transparent 46%)",
        }}
      />

      <section className="container-page relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4BFA94]">Support</p>
          <h1 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl">
            Frequently asked
            <br />
            questions
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Tickets, door check-in, payouts, and access. Before you buy or host.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Tickets", "Access", "Refunds", "Hosts", "Support"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.1] bg-black/50 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#4BFA94] px-8 text-[11px] font-bold uppercase tracking-[0.15em] text-black shadow-[0_16px_40px_-18px_rgba(75,250,148,0.5)] transition hover:bg-emerald-300"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.03] px-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/[0.06]"
            >
              Register
            </Link>
            <Link
              href="/create-event"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.03] px-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/[0.06]"
            >
              Create event
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <Link href="/contact" className="text-sm text-zinc-500 transition hover:text-zinc-300">
              Still need help? Contact us
            </Link>
            <p className="text-sm text-zinc-600">
              <Link href="/terms" className="transition hover:text-zinc-400">
                Terms
              </Link>
              <span className="mx-2 text-zinc-700">·</span>
              <Link href="/privacy" className="transition hover:text-zinc-400">
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
