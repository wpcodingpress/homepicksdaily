"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PayPalRedirectHandlerProps {
  paymentUrl: string;
  orderId: number;
}

export default function PayPalRedirectHandler({
  paymentUrl,
  orderId,
}: PayPalRedirectHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    window.location.href = paymentUrl;
  }, [paymentUrl]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface-muted border-t-brand-orange-500" />
      <p className="text-ink-muted">
        Redirecting to PayPal for order #{orderId}...
      </p>
    </div>
  );
}
