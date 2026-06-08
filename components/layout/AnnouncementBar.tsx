"use client";

import { useState, useEffect, useCallback } from "react";
import { Truck, Shield, Zap, X } from "lucide-react";

const messages = [
  { icon: <Truck className="w-4 h-4" />, text: "Free Shipping on Orders Over $50" },
  { icon: <Shield className="w-4 h-4" />, text: "30-Day Money-Back Guarantee" },
  { icon: <Zap className="w-4 h-4" />, text: "New Arrivals Every Week" },
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

  const msg = messages[index];

  return (
    <div className="relative bg-[#FF5722] text-white transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2.5 sm:px-6 lg:px-8">
        <span
          className={`flex items-center gap-2 text-[13px] font-medium transition-opacity duration-300 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {msg.icon}
          {msg.text}
        </span>
        <button
          onClick={handleClose}
          className="absolute right-4 flex h-6 w-6 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
