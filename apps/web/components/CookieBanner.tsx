"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const COOKIE_CONSENT_EVENT = "cookieConsentChange";

function subscribeToCookieConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  };
}

function getCookieConsentSnapshot() {
  return localStorage.getItem("cookieConsent") !== null;
}

function getServerCookieConsentSnapshot() {
  return true;
}

export function CookieBanner() {
  const hasConsent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot,
  );
  const [isDismissed, setIsDismissed] = useState(false);

  if (hasConsent || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies and our {" "}
          <Link href="/terms-and-conditions" className="underline hover:text-primary">Terms & Conditions</Link>.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsDismissed(true);
            }}
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={() => {
              localStorage.setItem("cookieConsent", "true");
              window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
