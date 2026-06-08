import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { seoTitle, getCustomerAttributes } from "@/lib/utils";
import { Shield, Truck, RefreshCw, ChevronRight, Home } from "lucide-react";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductPrice from "@/components/product/ProductPrice";
import VariantSelectorWrapper from "./VariantSelectorWrapper";
import SimpleProductForm from "@/components/product/SimpleProductForm";
import RelatedProducts from "@/components/product/RelatedProducts";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: seoTitle(product.name),
    description:
      product.short_description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
      undefined,
    openGraph: {
      images: product.images?.[0]?.src
        ? [{ url: product.images[0].src }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const variations =
    product.type === "variable"
      ? await getProductVariations(product.id)
      : [];

  const customerAttrs = getCustomerAttributes(product.attributes);

  const productInfo = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    type: product.type,
    price: product.price,
    stock_status: product.stock_status,
    images: product.images,
    sku: product.sku,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description?.replace(/<[^>]*>/g, ""),
    image: product.images?.[0]?.src,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price:
        product.type === "variable" ? undefined : product.price,
      priceCurrency: "USD",
      availability:
        product.stock_status === "instock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.average_rating && parseFloat(product.average_rating) > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.average_rating,
            reviewCount: product.rating_count,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ProductBreadcrumb
          categories={product.categories}
          productName={product.name}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <ProductImageGallery images={product.images} />

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-heading text-2xl font-extrabold text-[#1C1C2E] lg:text-3xl">
                {product.name}
              </h1>
              <div className="mt-2">
                <ProductPrice
                  price={product.price}
                  regularPrice={product.regular_price}
                  salePrice={product.sale_price}
                  onSale={product.on_sale}
                  priceHtml={product.price_html}
                  type={product.type}
                />
              </div>
            </div>

            {product.type === "variable" && variations.length > 0 && (
              <VariantSelectorWrapper
                product={productInfo}
                attributes={customerAttrs}
                variations={variations}
              />
            )}

            {product.type !== "variable" && (
              <SimpleProductForm product={productInfo} />
            )}

            <div
              className="prose prose-sm max-w-none text-[#6B7280]"
              dangerouslySetInnerHTML={{
                __html: product.short_description,
              }}
            />

            <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                <Shield className="w-4 h-4 text-[#00BCD4]" /> Secure Payment
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                <Truck className="w-4 h-4 text-[#00BCD4]" /> Free Shipping Over $50
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                <RefreshCw className="w-4 h-4 text-[#00BCD4]" /> Easy Returns
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              {product.stock_status === "instock" ? (
                <span className="flex items-center gap-1 text-[#4CAF50]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  In Stock
                </span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
              {product.sku && (
                <span className="ml-auto">SKU: {product.sku}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              <span className="border-b-2 border-[#FF5722] pb-3 font-heading text-sm font-bold text-[#1C1C2E]">
                Description
              </span>
            </div>
          </div>
          <div
            className="prose prose-sm max-w-none mt-6 text-[#6B7280]"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        <RelatedProducts relatedIds={product.related_ids} />
      </div>
    </>
  );
}
