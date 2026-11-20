"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MascotBuddies() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const buds = [
      ...document.querySelectorAll<HTMLElement>(
        "main .pup-buddy, footer .pup-buddy",
      ),
    ].filter((bud) => pathname !== "/" || !bud.closest("main [data-pup-stop]"));
    const visible = new Set<HTMLElement>();
    let pending = 0;
    let pointer: { x: number; y: number } | undefined;

    function render() {
      pending = 0;
      for (const bud of visible) {
        const bounds = bud.getBoundingClientRect();
        const x = pointer
          ? Math.max(
              -1,
              Math.min(
                1,
                (pointer.x - bounds.left - bounds.width * 0.65) / 260,
              ),
            )
          : 0;
        const y = pointer
          ? Math.max(
              -1,
              Math.min(
                1,
                (pointer.y - bounds.top - bounds.height * 0.38) / 190,
              ),
            )
          : 0;
        bud.style.setProperty("--buddy-look-x", `${(x * 4).toFixed(2)}px`);
        bud.style.setProperty("--buddy-look-y", `${(y * 2).toFixed(2)}px`);
        bud.style.setProperty("--buddy-turn", `${(x * 6).toFixed(2)}deg`);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          const bud = target as HTMLElement;
          if (isIntersecting) visible.add(bud);
          else visible.delete(bud);
          bud.toggleAttribute(
            "data-animated",
            isIntersecting && motion.matches,
          );
        }
      },
      { threshold: 0.12 },
    );
    buds.forEach((bud) => observer.observe(bud));

    function sync() {
      visible.forEach((bud) =>
        bud.toggleAttribute("data-animated", motion.matches),
      );
    }

    function move(event: PointerEvent) {
      if (!motion.matches || event.pointerType !== "mouse" || !visible.size)
        return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!pending) pending = requestAnimationFrame(render);
    }

    window.addEventListener("pointermove", move, { passive: true });
    motion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(pending);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      motion.removeEventListener("change", sync);
      for (const bud of buds) {
        bud.removeAttribute("data-animated");
        for (const prop of ["--buddy-look-x", "--buddy-look-y", "--buddy-turn"])
          bud.style.removeProperty(prop);
      }
    };
  }, [pathname]);

  return null;
}
