"use client";

import { useState } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { WCImage } from "@/lib/types";

interface ProductImageGalleryProps {
  images: WCImage[];
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const hasImages = images.length > 0;
  const currentSrc = hasImages
    ? images[selected]?.src
    : "/images/product-placeholder.jpg";

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-muted">
        <ImageWithFallback
          src={currentSrc}
          alt={images[selected]?.alt || "Product image"}
          fill
          preload
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === selected
                  ? "border-brand-orange-500"
                  : "border-transparent hover:border-surface-muted"
              }`}
            >
              <ImageWithFallback
                src={img.src}
                alt={img.alt || "Product thumbnail"}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
