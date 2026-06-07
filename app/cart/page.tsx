import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your cart before checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}
