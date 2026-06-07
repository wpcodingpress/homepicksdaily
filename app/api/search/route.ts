import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/woocommerce";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  try {
    const { products, total, totalPages } = await getProducts({
      search: q,
      per_page: "20",
    });
    return NextResponse.json({ products, total, totalPages, query: q });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
