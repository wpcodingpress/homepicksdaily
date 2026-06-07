"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
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
        <h1 className="font-heading text-2xl font-bold text-ink">
          Your cart is empty
        </h1>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-lg bg-brand-orange-500 px-6 py-3 font-bold text-white"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-heading text-3xl font-bold text-ink">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 space-y-6"
        >
          <div className="rounded-xl bg-surface-light p-6">
            <h2 className="mb-4 font-heading text-lg font-bold text-ink">
              Billing Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  First Name *
                </label>
                <input
                  {...register("first_name")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.first_name && (
                  <p className="mt-1 text-xs text-error">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Last Name *
                </label>
                <input
                  {...register("last_name")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.last_name && (
                  <p className="mt-1 text-xs text-error">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-error">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Phone *
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-error">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-ink">
                  Address Line 1 *
                </label>
                <input
                  {...register("address_1")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.address_1 && (
                  <p className="mt-1 text-xs text-error">
                    {errors.address_1.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  City *
                </label>
                <input
                  {...register("city")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-error">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Postcode *
                </label>
                <input
                  {...register("postcode")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.postcode && (
                  <p className="mt-1 text-xs text-error">
                    {errors.postcode.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-ink">
                  Country *
                </label>
                <input
                  {...register("country")}
                  className="w-full rounded-lg border border-surface-muted px-3 py-2.5 text-ink focus:ring-2 focus:ring-brand-orange-500"
                />
                {errors.country && (
                  <p className="mt-1 text-xs text-error">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "redirecting"}
            className="w-full rounded-lg bg-brand-orange-500 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-orange-600 disabled:opacity-60"
          >
            {status === "loading"
              ? "Processing..."
              : status === "redirecting"
                ? "Redirecting to PayPal..."
                : "Place Order via PayPal"}
          </button>

          {error && (
            <p className="rounded-lg bg-error/10 p-3 text-sm text-error">
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
