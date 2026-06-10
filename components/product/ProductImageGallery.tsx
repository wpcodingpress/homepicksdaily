"use client";

import { useState } from "react";
import Image from "next/image";
import type { WCImage } from "@/lib/types";

interface ProductImageGalleryProps {
  images: WCImage[];
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format&fit=crop";

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={hasImages ? images[selected]?.src : FALLBACK_IMG}
          alt={images[selected]?.alt || "Product image"}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === selected ? "border-[#F5811F]" : "border-transparent hover:border-gray-200"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || "Product thumbnail"}
                fill
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
