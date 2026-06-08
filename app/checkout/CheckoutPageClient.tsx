"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { CreditCard, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import OrderSummary from "@/components/checkout/OrderSummary";

const billingSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  address_1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  country: z.string().min(1, "Country is required"),
});

type BillingForm = z.infer<typeof billingSchema>;

export default function CheckoutPageClient() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "redirecting">("idle");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingForm>({
    resolver: zodResolver(billingSchema),
    defaultValues: { country: "US" },
  });

  const onSubmit = async (data: BillingForm) => {
    if (items.length === 0) return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billing: data,
          items: items.map((i) => ({
            id: i.id,
            variationId: i.variationId,
            quantity: i.quantity,
          })),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to create order");
      }

      setStatus("redirecting");
      clearCart();
      window.location.href = result.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (items.length === 0 && status !== "redirecting") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-[#1C1C2E]">
          Your cart is empty
        </h1>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-lg bg-[#FF5722] px-6 py-3 font-bold text-white"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="transition-colors hover:text-[#1C1C2E]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/cart" className="transition-colors hover:text-[#1C1C2E]">Cart</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C2E]">Checkout</span>
      </div>

      <h1 className="mb-8 font-heading text-3xl font-bold text-[#1C1C2E]">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 space-y-6"
        >
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 border-l-4 border-[#FF5722] pl-3 font-heading text-lg font-bold text-[#1C1C2E]">
              Billing Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {(["first_name", "last_name", "email", "phone", "address_1", "city", "postcode", "country"] as const).map((field) => (
                <div key={field} className={field === "address_1" || field === "country" ? "sm:col-span-2" : ""}>
                  <label className="mb-1 block text-sm font-medium text-[#1C1C2E]">
                    {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} *
                  </label>
                  <input
                    {...register(field)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-[#1C1C2E] outline-none transition-all focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]"
                  />
                  {errors[field] && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[field].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "redirecting"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5722] py-3.5 text-base font-bold text-white transition-all hover:bg-[#FF7043] disabled:opacity-60"
          >
            <CreditCard className="w-5 h-5" />
            {status === "loading"
              ? "Processing..."
              : status === "redirecting"
                ? "Redirecting to PayPal..."
                : "Place Order & Pay with PayPal"}
          </button>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
              {error}
            </p>
          )}
        </form>

        <div className="lg:col-span-2">
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}
