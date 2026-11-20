import type { Puppy } from "@/types";
import { neighbours } from "@/lib/catalogue";
import { whatsapp } from "@/lib/whatsapp";
import { PuppyGallery } from "@/components/gallery/PuppyGallery";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Markup } from "@/components/Markup";
import templates from "@/data/templates.json";
export function PuppyProfile({ puppy: p }: { puppy: Puppy }) {
  const { previous, next } = neighbours(p);
  const adopted = p.status === "adopted";
  const journey =
    p.origin === "imported"
      ? [
          [
            "Reserve your puppy",
            "Tell us which puppy has captured your heart.",
          ],
          [
            "Personalized consultation",
            "We finalize details with you and share updates on your puppy’s journey.",
          ],
          [
            "Import and arrival",
            "We manage health checks, travel arrangements, and documentation.",
          ],
          [
            "Welcome home",
            "We help your new puppy settle in and ensure a smooth transition into your home.",
          ],
        ]
      : [
          [
            "Explore available puppies",
            "Browse the puppies available in Dubai.",
          ],
          ["Select a puppy", "Tell us which puppy has captured your heart."],
          [
            "Meet your puppy",
            "Spend time together in the showroom before deciding.",
          ],
          [
            "Collection or delivery",
            "Take your puppy home or arrange safe delivery.",
          ],
        ];
  return (
    <article
      className="tp-storybook"
      style={{
        background: `linear-gradient(180deg, color-mix(in oklab, ${p.color} 24%, var(--color-milk)) 0, var(--color-milk) 85%)`,
      }}
    >
      <Markup html={templates["profile-ribbon"]} />
      <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="text-[0.95rem] font-semibold text-cocoa-soft"
        >
          <a className="link-ink" href={adopted ? "/gone-home" : "/puppies"}>
            {adopted ? "Gone home" : "Available puppies"}
          </a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{p.name}</span>
        </nav>
        <p className="tp-chapter">
          <span className="tp-chapter__n font-plush" aria-hidden="true">
            1
          </span>
          <span className="font-scrawl">
            {adopted ? "the day they went home" : "hello, it's me"}
          </span>
        </p>
        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <PuppyGallery name={p.name} media={p.media} />
          </div>
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
              <div
                data-reveal=""
                className="tp-tag tp-board mt-16 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-20"
              >
                <span className="tp-tag__ring" aria-hidden="true" />
                <Markup
                  html={templates["profile-mascot"].replaceAll("Max", p.name)}
                />
                <Markup
                  html={
                    templates[adopted ? "profile-adopted" : "profile-available"]
                  }
                />
                <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
                  {p.name}
                </h1>
                <p className="mt-2 text-lg font-semibold text-cocoa-soft">
                  {p.breed}
                </p>
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    ["Breed", p.breed],
                    ["Boy or girl", p.gender],
                    ["Age", p.age_display],
                    [
                      "Where",
                      p.origin === "imported" ? "Imported for you" : "In Dubai",
                    ],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-scrawl text-sm text-cocoa-soft">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    className="btn btn-whatsapp"
                    href={whatsapp(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {adopted
                      ? "Ask about a puppy like this"
                      : "Ask about " + p.name + " on WhatsApp"}
                  </a>
                  <a className="btn btn-ghost" href={"#enquire-" + p.slug}>
                    Send an enquiry
                  </a>
                </div>
              </div>
              <Markup html={templates.health.replaceAll("Max", p.name)} />
            </div>
          </div>
        </div>
        {!adopted ? (
          <section className="mt-20" aria-labelledby="journey-title">
            <p className="tp-chapter">
              <span className="tp-chapter__n font-plush">3</span>
              <span className="font-scrawl">the way home</span>
            </p>
            <h2 id="journey-title" className="font-plush text-big mt-3">
              {p.origin === "imported"
                ? "Coming home from abroad"
                : "Coming home from Dubai"}
            </h2>
            <ol className="tp-trail tp-trail--row tp-trail--paws mt-10">
              {journey.map(([title, body], i) => (
                <li key={title}>
                  <span className="tp-trail__num font-plush">{i + 1}</span>
                  <h3 className="font-plush-text text-xl font-bold leading-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-cocoa-soft">{body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        <section
          id={"enquire-" + p.slug}
          className="tp-letter mt-20 profile-enquiry"
        >
          <div>
            <p className="font-scrawl">dear TeddyPups…</p>
            <h2 className="font-plush text-big mt-2">
              {adopted
                ? "Looking for a puppy like this?"
                : "Ask about " + p.name}
            </h2>
            <p className="mt-4 text-cocoa-soft">
              Leave your details, or message on WhatsApp for the quickest reply.
            </p>
          </div>
          <EnquiryForm puppy={p} />
        </section>
        <nav className="profile-neighbours" aria-label="More puppies">
          {[
            [previous, "Previous pup"],
            [next, "Next pup"],
          ].map(([item, label]) => {
            const pup = item as Puppy;
            return (
              <a key={label as string} href={"/puppies/" + pup.slug}>
                <img
                  src={pup.media[0].url}
                  alt={pup.media[0].alt}
                  loading="lazy"
                />
                <div>
                  <span className="font-scrawl">{label as string}</span>
                  <h2 className="font-plush-text">{pup.name}</h2>
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </article>
  );
}
