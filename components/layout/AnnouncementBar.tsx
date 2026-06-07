"use client";

import { useState, useEffect, useCallback } from "react";

const messages = [
  "\u{1F33F} Free Shipping on Orders Over $50",
  "\u2705 30-Day Money-Back Guarantee",
  "\u26A1 New Arrivals Every Week \u2014 Shop Now",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHidden(sessionStorage.getItem("hp-announcement-closed") === "1");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = useCallback(() => {
    setHidden(true);
    sessionStorage.setItem("hp-announcement-closed", "1");
  }, []);

  if (hidden) return null;

  return (
    <div className="relative bg-brand-orange text-white transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2.5 sm:px-6 lg:px-8">
        <span
          className={`text-[13px] font-medium font-body transition-opacity duration-300 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {messages[index]}
        </span>
        <button
          onClick={handleClose}
          className="absolute right-4 flex h-6 w-6 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
          aria-label="Dismiss announcement"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
