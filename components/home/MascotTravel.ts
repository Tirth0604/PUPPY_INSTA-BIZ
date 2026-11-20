type Stop = { marker: HTMLElement; art: SVGSVGElement; bounds: DOMRect };
const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, value));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

const walkingParts = [
  ["body", "translate(0 0)", "1"],
  ["bf", "translate(94 192)", "1"],
  ["ff", "translate(168 192)", "1"],
  ["bn", "translate(110 194)", "1"],
  ["fn", "translate(186 194)", "1"],
  ["haunch", "translate(0 0)", "0"],
  ["head", "translate(0 0)", "1"],
] as const;

function fitWalkingPose(art: SVGSVGElement) {
  const parts = walkingParts.flatMap(([name, transform, opacity]) => {
    const node = art.querySelector<SVGGElement>(`[data-p="${name}"]`);
    if (!node) return [];
    if (["bf", "ff", "bn", "fn"].includes(name)) {
      const foot = document.createElementNS("http://www.w3.org/2000/svg", "g");
      foot.setAttribute("data-foot-swing", "");
      foot.append(...node.childNodes);
      node.append(foot);
    }
    return [
      {
        node,
        transform,
        opacity,
        restingTransform: node.getAttribute("transform"),
        restingOpacity: node.getAttribute("opacity"),
      },
    ];
  });
  return (walking: boolean) => {
    for (const part of parts) {
      for (const [key, value] of [
        ["transform", walking ? part.transform : part.restingTransform],
        ["opacity", walking ? part.opacity : part.restingOpacity],
      ] as const) {
        if (value === null) part.node.removeAttribute(key);
        else part.node.setAttribute(key, value);
      }
    }
  };
}

export function watchMascotTravel() {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const stops = [
    ...document.querySelectorAll<HTMLElement>("main [data-pup-stop]"),
  ];
  const layer = document.createElement("div");
  const actor = document.createElement("div");
  const pose = document.createElement("div");
  const bubble = document.createElement("span");
  layer.className = "pup-layer demo-mascot-layer";
  layer.setAttribute("aria-hidden", "true");
  actor.className = "demo-mascot";
  pose.className = "demo-mascot-pose";
  bubble.className = "pup-bubble";
  actor.append(pose, bubble);
  layer.append(actor);
  layer.hidden = true;
  document.body.append(layer);

  let frame = 0;
  let bubbleTimer = 0;
  let reactionTimer = 0;
  let current: HTMLElement | undefined;
  let eyes: SVGElement | null = null;
  let head: SVGElement | null = null;
  let pointer: { x: number; y: number } | undefined;
  let introduced = false;
  let walking = false;
  let updatePose: ((walking: boolean) => void) | undefined;

  function say(text: string) {
    clearTimeout(bubbleTimer);
    bubble.textContent = text;
    bubble.dataset.show = "true";
    bubbleTimer = window.setTimeout(() => delete bubble.dataset.show, 1450);
  }

  function mount(stop: Stop) {
    if (stop.marker === current) return;
    current = stop.marker;
    const art = stop.art.cloneNode(true) as SVGSVGElement;
    eyes = art.querySelector('[data-p="eyes"]');
    head = art.querySelector('[data-p="head"]');
    updatePose = fitWalkingPose(art);
    updatePose(walking);
    pose.replaceChildren(art);
    actor.dataset.pose = stop.marker.dataset.pose ?? "sit";
    layer.dataset.front = String(stop.marker.dataset.behind !== "true");
    actor.removeAttribute("data-react");
    delete bubble.dataset.show;
    clearTimeout(reactionTimer);
    if (actor.dataset.pose === "peek" && !introduced) {
      introduced = true;
      actor.dataset.react = "peek";
      reactionTimer = window.setTimeout(() => {
        if (actor.dataset.react === "peek" && !layer.hidden) say("peekaboo!");
      }, 1720);
    } else if (stop.marker.dataset.act === "tilt") {
      actor.dataset.react = "tilt";
    }
  }

  function render() {
    frame = 0;
    if (preference.matches) return;
    const visible: Stop[] = stops.flatMap((marker) => {
      const art = marker.querySelector("svg");
      const bounds = marker.getBoundingClientRect();
      return art && bounds.width > 0 ? [{ marker, art, bounds }] : [];
    });
    const first = visible[0];
    const last = visible.at(-1);
    if (!first || !last) return;
    const lane = innerHeight * 0.65;
    const treadmill = visible.find(({ marker, bounds }) => {
      const pin = marker.closest(".tp-meet[data-pinned] [data-pin-range]");
      const area = pin?.getBoundingClientRect();
      return (
        area && area.top <= 0 && area.bottom > innerHeight && bounds.top >= 0
      );
    });
    const right = visible.findIndex(({ bounds }) => bounds.top >= lane);
    const before =
      treadmill ??
      visible[Math.max(0, (right === -1 ? visible.length : right) - 1)];
    const after = treadmill ?? (right === -1 ? last : visible[right]);
    const span = after.bounds.top - before.bounds.top;
    const progress =
      span <= 0 ? 0 : clamp((lane - before.bounds.top) / span, 0, 1);
    const blend = smooth(progress);
    mount(blend < 0.55 ? before : after);

    const width = mix(before.bounds.width, after.bounds.width, blend);
    const x = mix(before.bounds.left, after.bounds.left, blend);
    const near = 1 - Math.sin(progress * Math.PI);
    const y = mix(lane, mix(before.bounds.top, after.bounds.top, blend), near);
    layer.hidden = y > innerHeight + 16 || y + width * 0.8 < -16;
    actor.style.width = `${width}px`;
    actor.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    const nextWalking =
      actor.dataset.pose !== "peek" &&
      (!!treadmill || (span > 0 && progress > 0.08 && progress < 0.93));
    if (walking !== nextWalking) {
      walking = nextWalking;
      actor.toggleAttribute("data-walking", walking);
      updatePose?.(walking);
    }
    if (pointer) {
      const dx = clamp((pointer.x - (x + width * 0.7)) / 220, -1, 1);
      const dy = clamp((pointer.y - (y + width * 0.33)) / 160, -1, 1);
      eyes?.style.setProperty("translate", `${dx * 5}px ${dy * 3}px`);
      head?.style.setProperty("rotate", `${dx * 7}deg`);
    } else {
      eyes?.style.removeProperty("translate");
      head?.style.removeProperty("rotate");
    }
  }

  function schedule() {
    if (!frame && !preference.matches) frame = requestAnimationFrame(render);
  }

  function move(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    pointer = { x: event.clientX, y: event.clientY };
    schedule();
  }

  function neutral() {
    pointer = undefined;
    schedule();
  }

  function pet() {
    actor.dataset.react = "pet";
    clearTimeout(reactionTimer);
    reactionTimer = window.setTimeout(() => delete actor.dataset.react, 800);
    say("♡");
  }

  function syncPreference() {
    const enabled = !preference.matches;
    visibleFallback(enabled);
    if (enabled) schedule();
    else {
      layer.hidden = true;
      clearTimeout(reactionTimer);
      delete actor.dataset.react;
      delete bubble.dataset.show;
    }
  }

  function visibleFallback(useActor: boolean) {
    for (const stop of stops)
      stop.toggleAttribute("data-actor-active", useActor);
  }

  preference.addEventListener("change", syncPreference);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("pointermove", move, { passive: true });
  document.documentElement.addEventListener("pointerleave", neutral);
  pose.addEventListener("click", pet);
  void document.fonts.ready.then(() => {
    if (layer.isConnected) schedule();
  });
  syncPreference();

  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(bubbleTimer);
    clearTimeout(reactionTimer);
    preference.removeEventListener("change", syncPreference);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pointermove", move);
    document.documentElement.removeEventListener("pointerleave", neutral);
    pose.removeEventListener("click", pet);
    visibleFallback(false);
    layer.remove();
  };
}
