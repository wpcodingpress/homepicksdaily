import type { WCProduct, WCCategory, WCVariation, WCOrderPayload } from "./types";

const WC_BASE = process.env.WC_API_BASE!;

const auth = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

const wcHeaders = {
  Authorization: `Basic ${auth}`,
  "Content-Type": "application/json",
};

export async function getProducts(
  params: Record<string, string> = {}
): Promise<{
  products: WCProduct[];
  total: number;
  totalPages: number;
}> {
  const query = new URLSearchParams({
    per_page: "20",
    status: "publish",
    ...params,
  }).toString();
  const res = await fetch(`${WC_BASE}/products?${query}`, {
    headers: wcHeaders,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`WC products fetch failed: ${res.status}`);
  const data: WCProduct[] = await res.json();
  const total = res.headers.get("X-WP-Total") ?? "0";
  const totalPages = res.headers.get("X-WP-TotalPages") ?? "1";
  return {
    products: data,
    total: parseInt(total, 10),
    totalPages: parseInt(totalPages, 10),
  };
}

export async function getProductBySlug(
  slug: string
): Promise<WCProduct | null> {
  const res = await fetch(`${WC_BASE}/products?slug=${slug}&status=publish`, {
    headers: wcHeaders,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`WC product slug fetch failed: ${res.status}`);
  const data: WCProduct[] = await res.json();
  return data[0] ?? null;
}

export async function getProductVariations(
  productId: number
): Promise<WCVariation[]> {
  const res = await fetch(
    `${WC_BASE}/products/${productId}/variations?per_page=100`,
    { headers: wcHeaders, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`WC variations fetch failed: ${res.status}`);
  return res.json();
}

export async function getCategories(): Promise<WCCategory[]> {
  const res = await fetch(
    `${WC_BASE}/products/categories?per_page=100&hide_empty=true&orderby=count&order=desc`,
    { headers: wcHeaders, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`WC categories fetch failed: ${res.status}`);
  return res.json();
}

export async function createOrder(orderData: WCOrderPayload) {
  const res = await fetch(`${WC_BASE}/orders`, {
    method: "POST",
    headers: wcHeaders,
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Failed to create order");
  }
  return res.json();
}
