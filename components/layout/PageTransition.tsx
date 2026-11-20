"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const onCommit = useRef<(pathname: string) => void>(null);

  useLayoutEffect(() => {
    onCommit.current?.(pathname);
  }, [pathname]);

  useEffect(() => {
    const curtain = document.querySelector<HTMLElement>(".tp-curtain");
    if (!curtain) return;
    const blanket = curtain.querySelector(".tp-curtain__blanket");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let timer = 0;
    let destination: URL | undefined;
    let historyAnchor: URL | undefined;
    let visiblePath = location.pathname;

    function scrollToFragment(hash: string) {
      if (!hash) return false;
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return false;
      }
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "instant" });
      return Boolean(target);
    }

    function idle() {
      clearTimeout(timer);
      destination = undefined;
      curtain!.dataset.state = "idle";
      delete root.dataset.curtain;
    }

    function move() {
      if (!destination || curtain!.dataset.state === "covered") return;
      curtain!.dataset.state = "covered";
      router.push(
        destination.pathname + destination.search + destination.hash,
        { scroll: false },
      );
      // A cancelled or stalled navigation must leave the current page usable.
      timer = window.setTimeout(idle, 5000);
    }

    function onAnimation(e: AnimationEvent) {
      if (e.target !== blanket) return;
      if (e.animationName === "tp-curtain-cover") {
        clearTimeout(timer);
        move();
      }
      if (
        e.animationName === "tp-curtain-lift" &&
        curtain?.dataset.state === "lifting"
      )
        idle();
    }

    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        !(e.target instanceof Element)
      )
        return;
      const anchor = e.target.closest("a[href]");
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      )
        return;
      const url = new URL(anchor.href, location.href);
      if (
        url.origin !== location.origin ||
        !["http:", "https:"].includes(url.protocol) ||
        url.pathname.replace(/\/$/, "") ===
          location.pathname.replace(/\/$/, "") ||
        !/^(?:\/(?:puppies(?:\/[a-z0-9-]+)?|gone-home|happy-families|how-it-works|faq|contact)?)\/?$/.test(
          url.pathname,
        )
      )
        return;

      e.preventDefault();
      if (destination) return;
      destination = url;
      if (reducedMotion.matches) {
        move();
      } else {
        root.dataset.curtain = "";
        curtain!.dataset.state = "covering";
        timer = window.setTimeout(move, 350);
      }
    }

    function restoreHistory() {
      idle();
      const url = new URL(location.href);
      historyAnchor =
        url.pathname !== visiblePath && url.hash ? url : undefined;
    }

    onCommit.current = (current) => {
      visiblePath = current;
      if (!destination) {
        if (historyAnchor?.pathname === current) {
          scrollToFragment(historyAnchor.hash);
        }
        historyAnchor = undefined;
        return;
      }
      if (
        current.replace(/\/$/, "") !== destination.pathname.replace(/\/$/, "")
      ) {
        idle();
        return;
      }
      clearTimeout(timer);
      const main = document.getElementById("main");
      if (!scrollToFragment(destination.hash)) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      main?.focus({ preventScroll: true });
      destination = undefined;
      if (reducedMotion.matches) idle();
      else {
        curtain.dataset.state = "lifting";
        timer = window.setTimeout(idle, 520);
      }
    };

    document.addEventListener("click", onClick);
    blanket?.addEventListener("animationend", onAnimation as EventListener);
    window.addEventListener("popstate", restoreHistory);
    return () => {
      document.removeEventListener("click", onClick);
      blanket?.removeEventListener(
        "animationend",
        onAnimation as EventListener,
      );
      window.removeEventListener("popstate", restoreHistory);
      clearTimeout(timer);
      delete root.dataset.curtain;
      onCommit.current = null;
    };
  }, [router]);

  return null;
}
