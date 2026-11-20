export function watchMeetMotion() {
  const section = document.querySelector<HTMLElement>(".tp-meet");
  const range = section?.querySelector<HTMLElement>("[data-pin-range]");
  const stage = section?.querySelector<HTMLElement>(".tp-meet__stage");
  const hall = section?.querySelector<HTMLElement>(".tp-meet__hall");
  const track = section?.querySelector<HTMLElement>(".tp-meet__track");
  if (!section || !range || !stage || !hall || !track) return () => {};

  const cards = [...track.querySelectorAll<HTMLElement>(".tp-door")];
  const plates = [...track.querySelectorAll<HTMLElement>(".tp-door__plate")];
  const header = section.querySelector<HTMLElement>(".tp-meet__head");
  const floor = section.querySelector<HTMLElement>(".tp-meet__floor");
  const pinned = matchMedia(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  );
  let frame = 0;
  let travel = 0;

  function sync() {
    frame = 0;
    if (!pinned.matches) return;
    const top = range!.getBoundingClientRect().top;
    const distance = Math.max(range!.offsetHeight - stage!.offsetHeight, 1);
    const progress = Math.min(1, Math.max(0, -top / distance));
    const offset = -travel * progress;
    track!.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
    hall!.style.setProperty("--floor-x", `${offset.toFixed(1)}px`);
    for (const card of cards) {
      card.dataset.open = String(card.offsetLeft + offset <= innerWidth * 0.36);
    }
  }

  function schedule() {
    if (pinned.matches && !frame) frame = requestAnimationFrame(sync);
  }

  function measure() {
    if (!pinned.matches) return;
    const plate = Math.max(64, ...plates.map((el) => el.offsetHeight));
    const headerEnd = header ? header.offsetTop + header.offsetHeight : 0;
    const allowance =
      stage!.clientHeight - headerEnd - (floor?.offsetHeight ?? 0) - plate - 40;
    hall!.style.setProperty(
      "--door-w",
      `${Math.round(Math.max(128, Math.min(256, innerWidth * 0.15, allowance / 1.3)))}px`,
    );
    travel = Math.max(0, track!.offsetWidth - stage!.clientWidth);
    range!.style.height = `calc(100vh + ${Math.round(travel * 0.8)}px)`;
    schedule();
  }

  function reset() {
    section!.removeAttribute("data-pinned");
    range!.style.removeProperty("height");
    track!.style.removeProperty("transform");
    hall!.style.removeProperty("--door-w");
    hall!.style.removeProperty("--floor-x");
    cards.forEach((card) => delete card.dataset.open);
  }

  function preferences() {
    if (pinned.matches) {
      section!.setAttribute("data-pinned", "");
      measure();
    } else reset();
  }

  function focusCard(event: FocusEvent) {
    if (!pinned.matches || !(event.target instanceof Element)) return;
    const card = event.target.closest<HTMLElement>(".tp-door");
    const bounds = card?.getBoundingClientRect();
    if (
      !card ||
      !bounds ||
      !travel ||
      (bounds.left >= 0 && bounds.right <= innerWidth)
    )
      return;
    const progress = Math.min(
      1,
      Math.max(0, (card.offsetLeft - innerWidth * 0.3) / travel),
    );
    const top = range!.getBoundingClientRect().top + scrollY;
    // Keyboard users need to see the focused card immediately.
    window.scrollTo({
      top: top + (range!.offsetHeight - stage!.offsetHeight) * progress,
      behavior: "instant",
    });
    stage!.scrollLeft = 0;
    schedule();
  }

  const resize = new ResizeObserver(measure);
  resize.observe(stage);
  if (header) resize.observe(header);
  pinned.addEventListener("change", preferences);
  window.addEventListener("resize", measure, { passive: true });
  window.addEventListener("scroll", schedule, { passive: true });
  track.addEventListener("focusin", focusCard);
  preferences();
  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    pinned.removeEventListener("change", preferences);
    window.removeEventListener("resize", measure);
    window.removeEventListener("scroll", schedule);
    track.removeEventListener("focusin", focusCard);
    reset();
  };
}
