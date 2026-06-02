"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { detectInAppBrowser, type InAppBrowserInfo } from "@/lib/in-app-browser";
import { cn } from "@/lib/utils";

export function useInAppBrowser() {
  const [info, setInfo] = useState<InAppBrowserInfo | null>(null);

  useEffect(() => {
    setInfo(detectInAppBrowser(navigator.userAgent));
  }, []);

  return info;
}

type InAppBrowserAuthBannerProps = {
  className?: string;
};

export function InAppBrowserAuthBanner({ className }: InAppBrowserAuthBannerProps) {
  const inApp = useInAppBrowser();
  const [copied, setCopied] = useState(false);

  if (!inApp) return null;

  const appLabel = inApp.label === "this app" ? "this app" : `the ${inApp.label} app`;

  async function copyLink() {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("textarea");
        input.value = url;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      role="status"
      className={cn(
        "rounded-2xl border border-amber-400/35 bg-amber-500/[0.08] px-4 py-3.5 text-sm leading-relaxed text-amber-50/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div className="flex gap-3">
        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-amber-100">Open in Safari or Chrome for Google sign-in</p>
          <p className="mt-1.5 text-xs leading-relaxed text-amber-100/85">
            Google blocks sign-in inside {appLabel}. Copy this link and open it in Safari or Chrome, or use email and password below.
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-amber-200/70">
            iPhone: tap <span className="font-semibold text-amber-100/90">⋯</span> →{" "}
            <span className="font-semibold text-amber-100/90">Open in Browser</span>
          </p>
          <button
            type="button"
            onClick={() => void copyLink()}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-amber-50 transition hover:bg-amber-400/20"
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}
