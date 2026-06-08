import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully.",
};

interface OrderConfirmationPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <CheckCircle className="mx-auto h-20 w-20 text-[#4CAF50]" />

      <h1 className="mt-6 font-heading text-3xl font-extrabold text-[#1C1C2E]">
        Order Confirmed!
      </h1>

      {orderId && (
        <p className="mt-2 text-[#6B7280]">
          Your order <span className="font-semibold text-[#1C1C2E]">#{orderId}</span> has been placed successfully.
        </p>
      )}

      <p className="mt-4 text-sm text-[#6B7280]">
        You will receive a confirmation email with your order details shortly.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF5722] px-8 py-3 font-bold text-white transition-colors hover:bg-[#FF7043]"
        >
          Continue Shopping
          <ChevronRight className="w-5 h-5" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-8 py-3 font-semibold text-[#1C1C2E] transition-colors hover:bg-gray-50"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
