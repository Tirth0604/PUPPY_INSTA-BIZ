"use client";

import { useEffect } from "react";
import { watchMeetMotion } from "./MeetMotion";
import { watchMascotTravel } from "./MascotTravel";

function watchConversation() {
  const steps = [...document.querySelectorAll<HTMLElement>(".tp-chat__step")];
  const messages = [...document.querySelectorAll<HTMLElement>(".tp-msg-group")];
  const desktop = matchMedia(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  );
  const original = steps.map(
    ({ dataset }) => [dataset.active, dataset.done] as const,
  );
  const typing = document.querySelector<HTMLElement>(".tp-typing");
  const status = document.querySelector<HTMLElement>(".tp-phone__status");
  const screen = document.querySelector<HTMLElement>(".tp-phone__screen");
  let frame = 0;
  let replyTimer = 0;
  let active = -1;
  let waiting = false;

  function render() {
    steps.forEach((step, index) => {
      step.toggleAttribute("data-active", index === active);
      step.toggleAttribute("data-done", index < active);
    });
    messages.forEach((message, index) => {
      message.dataset.show = String(
        index < active ||
          (index === active && !waiting) ||
          message.contains(document.activeElement),
      );
    });
    if (typing) typing.dataset.show = String(waiting);
    if (status) status.textContent = waiting ? "typing…" : "online";
  }

  function showReply() {
    waiting = false;
    render();
    if (!screen?.contains(document.activeElement)) {
      screen?.scrollTo({ top: screen.scrollHeight, behavior: "smooth" });
    }
  }

  function sync() {
    frame = 0;
    const next = steps.findLastIndex(
      (step) => step.getBoundingClientRect().top <= innerHeight * 0.38,
    );
    if (next === active) return;
    clearTimeout(replyTimer);
    waiting = next > active;
    active = next;
    render();
    if (waiting && !screen?.contains(document.activeElement)) {
      screen?.scrollTo({ top: screen.scrollHeight, behavior: "smooth" });
    }
    if (waiting) replyTimer = window.setTimeout(showReply, 750);
  }

  function schedule() {
    if (desktop.matches && !frame) frame = requestAnimationFrame(sync);
  }

  function reset() {
    clearTimeout(replyTimer);
    cancelAnimationFrame(frame);
    frame = 0;
    active = -1;
    waiting = false;
    steps.forEach((step, index) => {
      step.toggleAttribute("data-active", original[index][0] !== undefined);
      step.toggleAttribute("data-done", original[index][1] !== undefined);
    });
    messages.forEach((message) => {
      message.dataset.show = "true";
    });
    if (typing) typing.dataset.show = "false";
    if (status) status.textContent = "online";
  }

  function preferences() {
    if (desktop.matches) {
      render();
      schedule();
    } else reset();
  }

  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  desktop.addEventListener("change", preferences);
  preferences();
  return () => {
    removeEventListener("scroll", schedule);
    removeEventListener("resize", schedule);
    desktop.removeEventListener("change", preferences);
    reset();
  };
}

export function HomeMotion() {
  useEffect(() => {
    const stopConversation = watchConversation();
    const stopMeet = watchMeetMotion();
    const stopTravel = watchMascotTravel();
    return () => {
      stopConversation();
      stopTravel();
      stopMeet();
    };
  }, []);
  return null;
}
