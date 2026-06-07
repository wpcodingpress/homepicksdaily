import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully.",
};

interface OrderConfirmationPageProps {
  searchParams: Promise<{
    order_id?: string;
    key?: string;
  }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationPageProps) {
  const { order_id, key } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
        <svg
          className="h-10 w-10 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="mt-6 font-heading text-3xl font-bold text-ink">
        Order Confirmed!
      </h1>
      <p className="mt-2 text-ink-muted">
        Thank you for your order. You&apos;ll receive a confirmation
        email shortly.
      </p>

      {order_id && (
        <p className="mt-4 text-sm text-ink-muted">
          Order #: <span className="font-semibold text-ink">{order_id}</span>
        </p>
      )}

      <p className="mt-6 text-sm text-ink-light">
        Estimated delivery:{" "}
        <span className="font-semibold text-ink">
          15–25 business days
        </span>
      </p>

      <Link
        href="/shop"
        className="mt-8 inline-block rounded-lg bg-brand-orange-500 px-8 py-3 font-bold text-white transition-colors hover:bg-brand-orange-600"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
