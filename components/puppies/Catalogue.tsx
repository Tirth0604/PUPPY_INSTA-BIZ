import Form from "next/form";
import Link from "next/link";
import { filterPuppies, puppies, type CatalogueFilters } from "@/lib/catalogue";
import { Markup } from "@/components/Markup";
import templates from "@/data/templates.json";

type Option = {
  label: string;
  key?: keyof CatalogueFilters;
  value?: string;
};

const rows: {
  label: string;
  keys: (keyof CatalogueFilters)[];
  options: Option[];
}[] = [
  {
    label: "where",
    keys: ["origin", "collection"],
    options: [
      { label: "Everywhere" },
      { label: "Imported", key: "origin", value: "imported" },
      { label: "Korean Teacup", key: "collection", value: "korean-teacup" },
    ],
  },
  {
    label: "breed",
    keys: ["breed"],
    options: ["Maltipoo", "Pomeranian", "Poodle", "Cavapoo", "Shih Tzu"].map(
      (label) => ({
        label,
        key: "breed",
        value: label.toLowerCase().replaceAll(" ", "-"),
      }),
    ),
  },
  {
    label: "boy or girl",
    keys: ["gender"],
    options: [
      { label: "Boys", key: "gender", value: "male" },
      { label: "Girls", key: "gender", value: "female" },
    ],
  },
];

export function Catalogue({ filters }: { filters: CatalogueFilters }) {
  const list = filterPuppies({ ...filters, status: "available" });
  const hasFilters = Object.values(filters).some(Boolean);
  return (
    <>
      <div
        role="group"
        aria-label="Filter puppies"
        className="tp-sketchpad flex flex-col gap-4"
      >
        {rows.map(({ label, keys, options }) => (
          <div
            key={label}
            role="group"
            aria-label={label}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
              {label}
            </span>
            {options.map((option) => {
              const chosen = option.key
                ? filters[option.key] === option.value
                : keys.every((key) => !filters[key]);
              const next = { ...filters };
              keys.forEach((key) => {
                delete next[key];
              });
              if (option.key && !chosen) next[option.key] = option.value;
              return (
                <Form
                  key={option.label}
                  action="/puppies"
                  className="flex"
                  scroll={false}
                  prefetch={false}
                >
                  {Object.entries(next).map(([key, value]) =>
                    value ? (
                      <input key={key} type="hidden" name={key} value={value} />
                    ) : null,
                  )}
                  <button
                    type="submit"
                    aria-pressed={chosen}
                    className="tp-sticker-chip"
                  >
                    {option.label}
                  </button>
                </Form>
              );
            })}
          </div>
        ))}
      </div>
      <p
        className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]"
        aria-live="polite"
      >
        {list.length} {list.length === 1 ? "puppy" : "puppies"} looking for a
        home
        {hasFilters && (
          <>
            {" "}
            ·{" "}
            <Link className="link-ink" href="/puppies" scroll={false}>
              Clear filters
            </Link>
          </>
        )}
      </p>
      {list.length > 0 ? (
        <ul className="tp-sketches mt-8">
          {list.map((p) => (
            <Markup
              key={p.id}
              html={templates["catalogue-cards"][puppies.indexOf(p)]}
            />
          ))}
        </ul>
      ) : (
        <div className="tp-sketchpad mt-10" role="status">
          <h2 className="font-plush text-big">No puppies in this selection</h2>
          <p>Explore the full catalogue to meet the others.</p>
          <Link className="btn btn-primary mt-6" href="/puppies" scroll={false}>
            View all available puppies
          </Link>
        </div>
      )}
    </>
  );
}
