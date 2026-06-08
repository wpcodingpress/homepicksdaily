"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ToastData {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
}

let toastListeners: Array<(t: ToastData) => void> = [];

export function showToast(message: string, type?: "success" | "error" | "info") {
  const id = Math.random().toString(36).slice(2);
  toastListeners.forEach((fn) => fn({ id, message, type }));
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler = (t: ToastData) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 4000);
    };
    toastListeners.push(handler);
    return () => { toastListeners = toastListeners.filter((h) => h !== handler); };
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  if (toasts.length === 0) return null;

  const typeStyles: Record<string, string> = {
    success: "bg-[#FF5722] text-white",
    error: "bg-red-500 text-white",
    info: "bg-[#0F0F1A] text-white",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-xl px-5 py-3 shadow-2xl transition-all duration-300 animate-slideUp ${
            typeStyles[t.type ?? "info"]
          }`}
        >
          <span className="text-sm font-medium">{t.message}</span>
          <button onClick={() => remove(t.id)} className="text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
