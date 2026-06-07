import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/woocommerce";

const BASE = "https://homepicksdaily.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/cart`, lastModified: new Date(), changeFrequency: "never", priority: 0.3 },
    { url: `${BASE}/checkout`, lastModified: new Date(), changeFrequency: "never", priority: 0.3 },
  ];

  try {
    const { products } = await getProducts({ per_page: "100" });
    const productPages: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${BASE}/shop/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const categories = await getCategories();
    const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${BASE}/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...productPages, ...categoryPages];
  } catch {
    return staticPages;
  }
}
