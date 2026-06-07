import { NextRequest, NextResponse } from "next/server";

const WC_BASE = process.env.WC_API_BASE!;
const auth = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const res = await fetch(
      `${WC_BASE}/coupons?code=${encodeURIComponent(code)}`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const coupons = await res.json();
    if (!Array.isArray(coupons) || coupons.length === 0) {
      return NextResponse.json(
        { valid: false, message: "Coupon not found" },
        { status: 404 }
      );
    }
    const coupon = coupons[0];
    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        amount: coupon.amount,
        type: coupon.discount_type,
        minimumAmount: coupon.minimum_amount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
