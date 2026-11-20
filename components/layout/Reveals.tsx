"use client";
import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -24px 0px", threshold: 0.04 },
    );

    function arm(element: Element) {
      if (motion.matches) return;
      if (element.matches("[data-reveal]:not([data-armed])")) {
        element.setAttribute("data-armed", "");
        observer.observe(element);
      }
      element
        .querySelectorAll("[data-reveal]:not([data-armed])")
        .forEach((child) => {
          child.setAttribute("data-armed", "");
          observer.observe(child);
        });
    }

    function sync() {
      if (motion.matches) {
        observer.disconnect();
        document
          .querySelectorAll("[data-reveal][data-armed]")
          .forEach((element) => {
            element.removeAttribute("data-armed");
          });
      } else {
        arm(document.body);
      }
    }

    const added = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) arm(node);
        }
        for (const node of record.removedNodes) {
          if (!(node instanceof Element) || node.isConnected) continue;
          observer.unobserve(node);
          node
            .querySelectorAll("[data-reveal]")
            .forEach((child) => observer.unobserve(child));
        }
      }
    });

    sync();
    added.observe(document.body, { childList: true, subtree: true });
    motion.addEventListener("change", sync);
    return () => {
      added.disconnect();
      observer.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);
  return null;
}
