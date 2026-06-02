export type InAppBrowserId = "linkedin" | "instagram" | "facebook" | "tiktok" | "twitter" | "snapchat" | "generic";

export type InAppBrowserInfo = {
  id: InAppBrowserId;
  /** Human-readable app name for UI copy. */
  label: string;
};

const KNOWN_IN_APP_BROWSERS: { id: InAppBrowserId; label: string; test: RegExp }[] = [
  { id: "linkedin", label: "LinkedIn", test: /LinkedInApp|LinkedIn/i },
  { id: "instagram", label: "Instagram", test: /Instagram/i },
  { id: "facebook", label: "Facebook", test: /FBAN|FBAV|Facebook/i },
  { id: "tiktok", label: "TikTok", test: /TikTok|musical_ly/i },
  { id: "twitter", label: "X", test: /Twitter/i },
  { id: "snapchat", label: "Snapchat", test: /Snapchat/i },
];

/** Detect embedded / in-app browsers where Google OAuth is blocked. */
export function detectInAppBrowser(userAgent = ""): InAppBrowserInfo | null {
  const ua = userAgent.trim();
  if (!ua) return null;

  for (const browser of KNOWN_IN_APP_BROWSERS) {
    if (browser.test.test(ua)) {
      return { id: browser.id, label: browser.label };
    }
  }

  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  // iOS WebViews include AppleWebKit but omit a standalone Safari token.
  if (isIOS && /AppleWebKit/i.test(ua) && !/Safari/i.test(ua)) {
    return { id: "generic", label: "this app" };
  }

  // Android System WebView marker.
  if (isAndroid && /;\s*wv\)/i.test(ua)) {
    return { id: "generic", label: "this app" };
  }

  return null;
}

export function isInAppBrowser(userAgent?: string) {
  return detectInAppBrowser(userAgent ?? (typeof navigator !== "undefined" ? navigator.userAgent : "")) !== null;
}
