"use client";

import { useState, useEffect } from "react";

const messages = [
  "Free Shipping on orders over $49!",
  "Eco-Friendly Products for a Greener Home",
  "New Arrivals — Shop the Latest Drops",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-orange-500 px-4 py-2 text-center text-sm font-semibold text-white">
      {messages[index]}
    </div>
  );
}
