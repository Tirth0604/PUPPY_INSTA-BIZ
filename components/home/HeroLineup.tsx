"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Puppy } from "@/types";

const seats = [
  ["9%", "8.6rem", 0.62, -5],
  ["22.5%", "10.4rem", 0.8, 3],
  ["35%", "9.2rem", 0.7, -2],
  ["65%", "9.4rem", 0.74, 3],
  ["77.5%", "10.6rem", 0.82, -3],
  ["91%", "8.4rem", 0.6, 4],
] as const;
const initial = seats.map((_, index) => index);
const rotationOrder = [3, 0, 4, 1, 5, 2];

export function HeroLineup({ puppies }: { puppies: Puppy[] }) {
  const lineup = useRef<HTMLUListElement>(null);
  const [selection, setSelection] = useState(initial);
  const [motion, setMotion] = useState<{
    index: number;
    phase: "duck" | "pop";
  }>();
  const [hovered, setHovered] = useState<number>();
  const [focused, setFocused] = useState<number>();
  useEffect(() => {
    const element = lineup.current;
    if (!element || puppies.length <= seats.length) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let step = 0;
    let nextPuppy = seats.length;
    let timer: ReturnType<typeof setTimeout>;
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    visibility.observe(element);
    function rotate() {
      const index = rotationOrder[step % rotationOrder.length];
      const anchor = element?.querySelectorAll("a")[index];
      if (
        reduced.matches ||
        !inView ||
        document.hidden ||
        anchor?.matches(":hover, :focus-within")
      ) {
        timer = setTimeout(rotate, 2000);
        return;
      }
      step++;
      setMotion({ index, phase: "duck" });
      timer = setTimeout(() => {
        if (reduced.matches || anchor?.matches(":hover, :focus-within")) {
          setMotion(undefined);
          timer = setTimeout(rotate, 2000);
          return;
        }
        const puppyIndex = nextPuppy;
        nextPuppy = (nextPuppy + 1) % puppies.length;
        setSelection((previous) =>
          previous.map((value, seat) => (seat === index ? puppyIndex : value)),
        );
        setMotion({ index, phase: "pop" });
        timer = setTimeout(() => {
          setMotion(undefined);
          timer = setTimeout(rotate, 1080);
        }, 580);
      }, 340);
    }
    timer = setTimeout(rotate, 2300);
    return () => {
      clearTimeout(timer);
      visibility.disconnect();
    };
  }, [puppies.length]);
  const seatStyles = seats.map(
    ([x, width, peek, tilt], index) =>
      ({
        "--x": x,
        "--w": width,
        "--peek": peek,
        "--tilt": `${tilt}deg`,
        "--i": index,
      }) as CSSProperties,
  );
  return (
    <>
      <ul
        ref={lineup}
        className="tp-lineup"
        aria-label="Some of the puppies in our showroom"
      >
        {seatStyles.map((style, i) => {
          const p = puppies[selection[i]],
            m = p.media[0];
          return (
            <li key={i} className="tp-lineup__seat" style={style}>
              <a
                className="tp-lineup__pup"
                href={"/puppies/" + p.slug}
                aria-label={`Meet ${p.name}, ${p.breed}`}
                data-state={motion?.index === i ? motion.phase : undefined}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(undefined)}
                onFocus={() => setFocused(i)}
                onBlur={() => setFocused(undefined)}
              >
                <span className="tp-lineup__photo">
                  <img
                    src={m.url}
                    alt={m.alt}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: `${m.focalX * 100}% ${m.focalY * 100}%`,
                    }}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="tp-lineup tp-lineup--tags" aria-hidden="true">
        {seatStyles.map((style, index) => (
          <li key={index} className="tp-lineup__seat" style={style}>
            <span
              className="tp-lineup__ghost"
              data-tag={
                hovered === index || focused === index ? "show" : undefined
              }
            >
              <span className="tp-lineup__name font-scrawl">
                {puppies[selection[index]].name}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
