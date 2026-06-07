import { NextRequest, NextResponse } from "next/server";
import { getProductVariations } from "@/lib/woocommerce";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const variations = await getProductVariations(Number(id));
    return NextResponse.json(variations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch variations" },
      { status: 500 }
    );
  }
}
