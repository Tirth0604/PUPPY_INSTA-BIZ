"use client";
import { useState, type ReactNode, type CSSProperties } from "react";
import type { FAQ } from "@/types";
import { whatsapp } from "@/lib/whatsapp";

const tilts = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4, -1.6];
const pinColors = [
  "var(--color-toffee)",
  "var(--color-sky-deep)",
  "#d9a13c",
  "#c45a6a",
];

function highlight(text: string, query: string) {
  if (!query) return text;
  const parts: ReactNode[] = [];
  const lower = text.toLowerCase();
  let start = 0;
  for (
    let match = lower.indexOf(query);
    match >= 0;
    match = lower.indexOf(query, start)
  ) {
    parts.push(text.slice(start, match));
    start = match + query.length;
    parts.push(<mark key={match}>{text.slice(match, start)}</mark>);
  }
  parts.push(text.slice(start));
  return parts;
}

export function FAQBoard({ faqs, mascot }: { faqs: FAQ[]; mascot: ReactNode }) {
  const [q, setQ] = useState(""),
    [open, setOpen] = useState<string[]>([]);
  const query = q.trim().toLowerCase();
  const filtered = faqs.filter((f) =>
    (f.question + " " + f.answer).toLowerCase().includes(query),
  );
  return (
    <div
      className="tp-notes"
      data-open={
        filtered.some((f) => query || open.includes(f.id)) ? "" : undefined
      }
    >
      <aside className="tp-notes__side" aria-label="Find a question">
        <label className="font-scrawl tp-notes__label" htmlFor="faq-search">
          sniff out a question
        </label>
        <div className="tp-notes__search">
          <svg
            className="tp-notes__lens"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            id="faq-search"
            type="search"
            autoComplete="off"
            placeholder="delivery, Korea, vaccinated…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p aria-live="polite" className="tp-notes__count">
          {filtered.length} {query ? "notes found" : "notes on the board"}
        </p>
        {q && (
          <button className="link-ink" onClick={() => setQ("")}>
            Clear search
          </button>
        )}
        <div className="tp-notes__teddy">
          <span aria-hidden="true" className="tp-notes__bubble font-plush">
            <span className="tp-notes__q">?</span>
            <span className="tp-notes__a">!</span>
          </span>
          {mascot}
        </div>
        <a
          className="btn btn-whatsapp tp-notes__ask"
          href={whatsapp(
            undefined,
            "I have a question about adopting a puppy.",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask your own question
        </a>
      </aside>
      <div className="tp-notes__board">
        <ul className="tp-notes__list">
          {filtered.map((f, i) => {
            const unfolded = !!query || open.includes(f.id);
            return (
              <li
                key={f.id}
                className="tp-note"
                data-reveal=""
                data-unfolded={unfolded ? "" : undefined}
                style={
                  {
                    "--tilt": `${tilts[i]}deg`,
                    "--pin": pinColors[i % pinColors.length],
                    "--i": i,
                  } as CSSProperties
                }
              >
                <span className="tp-note__pin" aria-hidden="true" />
                <h2 className="tp-note__q">
                  <button
                    id={"q-" + f.id}
                    aria-controls={"a-" + f.id}
                    aria-expanded={unfolded}
                    onClick={() =>
                      setOpen((list) =>
                        list.includes(f.id)
                          ? list.filter((id) => id !== f.id)
                          : [...list, f.id],
                      )
                    }
                  >
                    <span className="font-plush-text">
                      {highlight(f.question, query)}
                    </span>
                    <span className="tp-note__chevron" aria-hidden="true" />
                  </button>
                </h2>
                <div
                  id={"a-" + f.id}
                  role="region"
                  aria-labelledby={"q-" + f.id}
                  className="tp-note__answer"
                  inert={!unfolded}
                >
                  <div className="tp-note__flap">
                    <p>{highlight(f.answer, query)}</p>
                  </div>
                </div>
              </li>
            );
          })}
          {!filtered.length && (
            <li className="tp-paper">
              <h2 className="font-plush text-2xl">No notes found</h2>
              <p>Try “Dubai”, “delivery”, or “vaccinated”.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
