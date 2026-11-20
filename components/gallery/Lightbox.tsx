"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Media } from "@/types";
import { mediaIndex } from "@/lib/media";
export function MediaView({
  media,
  contain = false,
  openPhoto,
}: {
  media: Media;
  contain?: boolean;
  openPhoto?: { label: string; action: () => void };
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (failed)
    return (
      <div className="media-error" role="status">
        This media could not load.{" "}
        <button onClick={() => setFailed(false)}>Retry</button>
        <a href={media.url} download>
          Download media
        </a>
      </div>
    );
  const image = media.kind !== "video";
  const visual = !image ? (
    <video
      key={media.url}
      src={media.url}
      poster={media.poster?.url}
      controls
      aria-label={media.alt}
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
      style={{ objectFit: "contain" }}
    />
  ) : (
    <img
      src={media.url}
      alt={media.alt}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      style={{
        backgroundColor: contain ? "transparent" : media.color,
        objectFit: contain ? "contain" : "cover",
        objectPosition: `${media.focalX * 100}% ${media.focalY * 100}%`,
      }}
    />
  );
  return (
    <div className="media-visual" aria-busy={image && !loaded}>
      {image && openPhoto ? (
        <button
          className="gallery-open-photo"
          type="button"
          onClick={openPhoto.action}
          aria-label={openPhoto.label}
        >
          {visual}
        </button>
      ) : (
        visual
      )}
      {image && !loaded && (
        <span role="status" className="sr-only">
          Loading photo
        </span>
      )}
    </div>
  );
}
export function Lightbox({
  media,
  initial,
  onClose,
}: {
  media: Media[];
  initial: number;
  onClose: () => void;
}) {
  const [{ index, direction }, setSlide] = useState({
    index: initial,
    direction: 0,
  });
  const ref = useRef<HTMLDialogElement>(null);
  const drag = useRef<{ id: number; x: number } | null>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const el = ref.current;
    el?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);
  const change = (direction: number) =>
    setSlide(({ index }) => ({
      index: mediaIndex(index, direction, media.length),
      direction,
    }));
  return (
    <dialog
      ref={ref}
      className="demo-lightbox"
      aria-label="Photo gallery"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if ((e.target as Element).closest("video")) return;
        if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
        e.preventDefault();
        change(e.key === "ArrowRight" ? 1 : -1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-header">
        <p aria-live="polite">
          {index + 1} / {media.length}
          {media[index].caption ? ` — ${media[index].caption}` : ""}
        </p>
        <button
          className="lightbox-close"
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close gallery"
        >
          Close
        </button>
      </div>
      <div
        className="lightbox-media"
        onPointerDown={(e) => {
          if (
            !e.isPrimary ||
            e.button !== 0 ||
            (e.target as Element).closest("video, button, a")
          )
            return;
          drag.current = { id: e.pointerId, x: e.clientX };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current?.id !== e.pointerId) return;
          e.currentTarget.style.setProperty(
            "--drag-x",
            `${(e.clientX - drag.current.x) * 0.55}px`,
          );
        }}
        onLostPointerCapture={(e) => {
          drag.current = null;
          e.currentTarget.style.removeProperty("--drag-x");
        }}
        onPointerUp={(e) => {
          if (drag.current?.id !== e.pointerId) return;
          const delta = e.clientX - drag.current.x;
          if (Math.abs(delta) >= 80) change(delta < 0 ? 1 : -1);
        }}
      >
        <div
          className="lightbox-slide"
          key={index}
          data-sliding={direction !== 0 || undefined}
          style={{ "--slide-direction": direction } as CSSProperties}
        >
          <MediaView media={media[index]} contain />
        </div>
      </div>
      {media.length > 1 && (
        <div className="lightbox-controls">
          <button
            type="button"
            onClick={() => change(-1)}
            aria-label="Previous photo"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => change(1)}
            aria-label="Next photo"
          >
            Next
          </button>
        </div>
      )}
    </dialog>
  );
}
