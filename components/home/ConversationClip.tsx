"use client";

import { useRef, useState } from "react";

export function ConversationClip() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  async function toggle() {
    const clip = video.current;
    if (!clip) return;
    if (!clip.paused) {
      clip.pause();
      return;
    }
    try {
      await clip.play();
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }

  return (
    <div className="tp-clip">
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
        src="/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
        aria-label="Demonstration puppy video"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="tp-clip__play"
        aria-label={playing ? "Pause video" : "Play video"}
        aria-pressed={playing}
        onClick={toggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={playing ? "M7 5h3v14H7zM14 5h3v14h-3z" : "M8 5v14l11-7z"} />
        </svg>
      </button>
      {failed && <p role="status">The video could not play. Try again.</p>}
    </div>
  );
}
