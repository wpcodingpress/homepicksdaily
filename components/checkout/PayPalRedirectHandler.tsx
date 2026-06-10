"use client";

import { useEffect } from "react";

interface PayPalRedirectHandlerProps {
  paymentUrl: string;
  orderId: number;
}

export default function PayPalRedirectHandler({
  paymentUrl,
  orderId,
}: PayPalRedirectHandlerProps) {
  useEffect(() => {
    window.location.href = paymentUrl;
  }, [paymentUrl]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#F5811F]" />
      <p className="text-[#6B7280]">
        Redirecting to PayPal for order #{orderId}...
      </p>
    </div>
  );
}
