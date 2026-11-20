"use client";
import { useState, type ReactNode } from "react";
import type { Media } from "@/types";
import { Lightbox } from "./Lightbox";
export function FamilyGallery({
  photos,
  children,
}: {
  photos: Media[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <div
      onClick={(e) => {
        const button = (e.target as Element).closest<HTMLButtonElement>(
          "[data-photo-index]",
        );
        if (button) setIndex(Number(button.dataset.photoIndex));
      }}
    >
      {children}
      {index !== null && (
        <Lightbox
          media={photos}
          initial={index}
          onClose={() => setIndex(null)}
        />
      )}
    </div>
  );
}
