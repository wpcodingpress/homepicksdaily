import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { billing, items } = body;

    const orderPayload = {
      payment_method: "paypal" as const,
      payment_method_title: "PayPal",
      set_paid: false,
      billing,
      shipping: billing,
      line_items: items.map(
        (item: { id: number; variationId?: number; quantity: number }) => ({
          product_id: item.id,
          variation_id: item.variationId ?? 0,
          quantity: item.quantity,
        })
      ),
    };

    const order = await createOrder(orderPayload);
    return NextResponse.json({
      orderId: order.id,
      paymentUrl: order.payment_url,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
