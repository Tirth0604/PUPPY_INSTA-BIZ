"use client";
import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const dialog = header.querySelector("dialog");
    if (dialog?.open) dialog.close();
    header.toggleAttribute("data-home", pathname === "/");
    header.dataset.hidden = "false";
    header
      .querySelectorAll<HTMLAnchorElement>("nav a, .tp-menu-link")
      .forEach((a) => {
        const href = a.getAttribute("href");
        const active =
          href === pathname || Boolean(href && pathname.startsWith(href + "/"));
        a.dataset.active = String(active);
        if (active) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
  }, [pathname]);

  useEffect(() => {
    const header = document.getElementById("site-header");
    const dialog = header?.querySelector("dialog");
    const open = header?.querySelector<HTMLButtonElement>(
      '[aria-haspopup="dialog"]',
    );
    const close = dialog?.querySelector("button");
    if (!header || !dialog || !open) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 1024px)");
    let lastY = window.scrollY;
    let closeTimer = 0;
    let previousOverflow = "";
    open.setAttribute("aria-expanded", "false");

    function finish() {
      clearTimeout(closeTimer);
      if (dialog?.open) dialog.close();
    }
    function onClose() {
      clearTimeout(closeTimer);
      dialog?.removeAttribute("data-closing");
      document.body.style.overflow = previousOverflow;
      open?.setAttribute("aria-expanded", "false");
    }
    function begin() {
      if (dialog?.open || desktop.matches) return;
      previousOverflow = document.body.style.overflow;
      dialog?.showModal();
      document.body.style.overflow = "hidden";
      open?.setAttribute("aria-expanded", "true");
    }
    function end() {
      if (!dialog?.open || dialog.hasAttribute("data-closing")) return;
      if (reducedMotion.matches) finish();
      else {
        dialog.dataset.closing = "";
        closeTimer = window.setTimeout(finish, 460);
      }
    }
    function onCancel(e: Event) {
      e.preventDefault();
      end();
    }
    function onAnimation(e: AnimationEvent) {
      if (e.target === dialog && e.animationName === "tp-menu-out") finish();
    }
    function scroll() {
      const y = window.scrollY;
      header!.dataset.scrolled = String(y > 20);
      header!.dataset.hidden = String(y > 150 && y > lastY && !dialog?.open);
      lastY = y;
    }
    function navigate(e: MouseEvent) {
      if ((e.target as Element).closest("a") || e.target === dialog) end();
    }
    open.addEventListener("click", begin);
    close?.addEventListener("click", end);
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("animationend", onAnimation);
    dialog.addEventListener("click", navigate);
    desktop.addEventListener("change", finish);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      finish();
      onClose();
      open.removeEventListener("click", begin);
      close?.removeEventListener("click", end);
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("animationend", onAnimation);
      dialog.removeEventListener("click", navigate);
      desktop.removeEventListener("change", finish);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return null;
}
