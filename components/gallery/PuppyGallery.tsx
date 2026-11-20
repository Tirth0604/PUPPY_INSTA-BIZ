"use client";
import { useRef, useState } from "react";
import type { Media } from "@/types";
import { Lightbox, MediaView } from "./Lightbox";
import { mediaIndex } from "@/lib/media";
export function PuppyGallery({
  name,
  media,
}: {
  name: string;
  media: Media[];
}) {
  const [{ index, previous, direction }, setSlide] = useState({
      index: 0,
      previous: -1,
      direction: 0,
    }),
    [full, setFull] = useState(false);
  const start = useRef(0);
  const swiped = useRef(false);
  const openLabel = `Open ${name}, ${media[index].kind === "video" ? "video" : "photo"} ${index + 1} of ${media.length} full screen`;
  function change(value: number, relative = true) {
    setSlide((slide) => {
      const next = relative
        ? mediaIndex(slide.index, value, media.length)
        : value;
      return next === slide.index
        ? slide
        : {
            index: next,
            previous: slide.index,
            direction: Math.sign(relative ? value : next - slide.index),
          };
    });
  }
  return (
    <div
      onKeyDown={(e) => {
        if ((e.target as Element).closest("video, dialog")) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          change(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          change(-1);
        }
      }}
    >
      <div
        className="tp-storypage puppy-viewer"
        onTouchStart={(e) => {
          swiped.current = false;
          start.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const d = e.changedTouches[0].clientX - start.current;
          if (Math.abs(d) > 60) {
            swiped.current = true;
            change(d < 0 ? 1 : -1);
          }
        }}
      >
        {previous >= 0 && media[previous].kind !== "video" && (
          <img
            className="puppy-turn-previous"
            src={media[previous].url}
            alt=""
            style={{
              objectPosition: `${media[previous].focalX * 100}% ${media[previous].focalY * 100}%`,
            }}
          />
        )}
        <div
          className="puppy-turn"
          data-direction={direction || undefined}
          key={index}
          onAnimationEnd={() =>
            setSlide((slide) =>
              slide.index === index ? { ...slide, previous: -1 } : slide,
            )
          }
        >
          <MediaView
            media={media[index]}
            openPhoto={{
              label: openLabel,
              action: () => {
                if (!swiped.current) setFull(true);
                swiped.current = false;
              },
            }}
          />
        </div>
        {media[index].kind === "video" && (
          <button
            className="expand-media"
            onClick={() => setFull(true)}
            aria-label={openLabel}
          >
            ⛶
          </button>
        )}
        {media.length > 1 && (
          <div className="gallery-controls">
            <button aria-label="Previous photo" onClick={() => change(-1)}>
              ‹
            </button>
            <span aria-live="polite">
              {index + 1} / {media.length}
            </span>
            <button aria-label="Next photo" onClick={() => change(1)}>
              ›
            </button>
          </div>
        )}
      </div>
      <ul className="gallery-thumbnails" aria-label={`All photos of ${name}`}>
        {media.map((m, i) => (
          <li key={m.id}>
            <button
              aria-current={i === index ? "true" : undefined}
              aria-label={`${name}, ${m.kind === "video" ? "video" : "photo"} ${i + 1} of ${media.length}`}
              onClick={() => change(i, false)}
            >
              <img
                src={m.kind === "video" ? m.poster?.url : m.url}
                alt=""
                loading="lazy"
                style={{
                  objectPosition: `${(m.poster ?? m).focalX * 100}% ${(m.poster ?? m).focalY * 100}%`,
                }}
              />
              {m.kind === "video" && <span aria-hidden="true">▶</span>}
            </button>
          </li>
        ))}
      </ul>
      {full && (
        <Lightbox
          media={media}
          initial={index}
          onClose={() => setFull(false)}
        />
      )}
    </div>
  );
}
