"use client";
import { useRef, type ReactNode } from "react";

export function Journeys({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  function select(tab: HTMLElement) {
    if (tab.getAttribute("aria-selected") === "true") return;
    const tabs = [
      ...(root.current?.querySelectorAll<HTMLElement>("[role=tab]") ?? []),
    ];
    const index = tabs.indexOf(tab);
    if (index === -1) return;

    tabs.forEach((el, i) => {
      el.setAttribute("aria-selected", String(i === index));
      el.tabIndex = i === index ? 0 : -1;
    });
    root.current
      ?.querySelector<HTMLElement>(".tp-switch")
      ?.style.setProperty("--at", String(index));
    root.current?.querySelector(".tp-journeys")?.setAttribute("data-ready", "");
    root.current
      ?.querySelectorAll<HTMLElement>("[role=tabpanel]")
      .forEach((el) => {
        el.hidden = el.id !== tab.getAttribute("aria-controls");
      });
    tab.focus();
  }

  return (
    <div
      ref={root}
      onClick={(e) => {
        const tab = (e.target as Element).closest<HTMLElement>("[role=tab]");
        if (tab) select(tab);
      }}
      onKeyDown={(e) => {
        const target = (e.target as Element).closest<HTMLElement>("[role=tab]");
        if (
          !target ||
          !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
        )
          return;
        const tabs = [
          ...(root.current?.querySelectorAll<HTMLElement>("[role=tab]") ?? []),
        ];
        const index = tabs.indexOf(target);
        if (index === -1) return;
        e.preventDefault();
        const next =
          e.key === "Home"
            ? 0
            : e.key === "End"
              ? tabs.length - 1
              : (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) %
                tabs.length;
        select(tabs[next]);
      }}
    >
      {children}
    </div>
  );
}
