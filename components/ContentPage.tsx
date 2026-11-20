import templates from "@/data/templates.json";
import homeFamilyData from "@/data/home-families.json";
import {
  puppies,
  families,
  faqs,
  type CatalogueFilters,
} from "@/lib/catalogue";
import { Markup } from "./Markup";
import { ConversationClip } from "./home/ConversationClip";
import { HeroLineup } from "./home/HeroLineup";
import { FamilyGallery } from "./gallery/FamilyGallery";
import { FAQBoard } from "./faq/FAQBoard";
import { Journeys } from "./home/Journeys";
import { EnquiryForm } from "./forms/EnquiryForm";
import { Catalogue } from "./puppies/Catalogue";
const homePreviews = homeFamilyData.map(
  (media) => families.find((photo) => photo.url === media.url) ?? media,
);
const homeGallery = [
  ...homePreviews,
  ...families.filter(
    (photo) => !homePreviews.some((preview) => preview.url === photo.url),
  ),
];

export const pageNames = [
  "home",
  "puppies",
  "gone-home",
  "happy-families",
  "how-it-works",
  "faq",
  "contact",
] as const;
export type PageName = (typeof pageNames)[number];
const contactContexts: Partial<Record<PageName, string>> = {
  contact: "I'd like to ask about visiting the showroom.",
  "how-it-works": "I'd like to ask how to bring a puppy home.",
  "gone-home": "I'd love to find a puppy similar to one in your gallery.",
  puppies: "I'd like to ask about the available puppies.",
};
export function ContentPage({
  name,
  filters = {},
}: {
  name: PageName;
  filters?: CatalogueFilters;
}) {
  return (
    <Markup
      html={
        name === "contact"
          ? templates.contact.replace(
              '<div class="tp-post" data-phase="writing">',
              "<div>",
            )
          : templates[name]
      }
      whatsappContext={contactContexts[name]}
      slots={{
        hero: (
          <HeroLineup
            puppies={puppies.filter((p) => p.status === "available")}
          />
        ),
        catalogue: <Catalogue filters={filters} />,
        families: (
          <FamilyGallery photos={families}>
            <Markup html={templates["family-list"]} />
          </FamilyGallery>
        ),
        "home-families": (
          <FamilyGallery photos={homeGallery}>
            <Markup html={templates["home-family-list"]} />
          </FamilyGallery>
        ),
        faq: (
          <FAQBoard
            faqs={faqs}
            mascot={<Markup html={templates["faq-mascot"]} />}
          />
        ),
        journeys: (
          <Journeys>
            <Markup html={templates.journeys} />
          </Journeys>
        ),
        "contact-form": (
          <EnquiryForm
            letter
            choices={puppies.filter((p) => p.status === "available")}
          />
        ),
        clip: <ConversationClip />,
      }}
    />
  );
}
