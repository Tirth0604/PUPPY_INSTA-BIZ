import puppyData from "@/data/puppies.json";
import familyData from "@/data/families.json";
import faqData from "@/data/faqs.json";
import type { Puppy, Media, FAQ } from "@/types";
export const puppies = puppyData as Puppy[];
export const families = familyData as Media[];
export const faqs = faqData as FAQ[];
export function findPuppy(slug: string) {
  return puppies.find((p) => p.slug === slug);
}
export type CatalogueFilters = {
  breed?: string;
  origin?: string;
  collection?: string;
  gender?: string;
};

export function filterPuppies(
  filters: CatalogueFilters & {
    status?: string;
  },
) {
  const breed = filters.breed?.toLowerCase().replaceAll("-", " ");
  return puppies.filter(
    (p) =>
      (!filters.status || p.status === filters.status) &&
      (!filters.origin || p.origin === filters.origin) &&
      (!filters.collection ||
        (filters.collection === "korean-teacup" &&
          p.breed.startsWith("Korean Teacup"))) &&
      (!filters.gender ||
        (filters.gender === "male" && p.gender.toLowerCase().includes("boy")) ||
        (filters.gender === "female" &&
          p.gender.toLowerCase().includes("girl"))) &&
      (!breed || p.breed.toLowerCase().includes(breed)),
  );
}
export function neighbours(p: Puppy) {
  const list = puppies.filter((x) => x.status === p.status);
  const i = list.findIndex((x) => x.id === p.id);
  return {
    previous: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}
export function searchFAQs(query: string) {
  const q = query.trim().toLowerCase();
  return faqs.filter((f) =>
    (f.question + " " + f.answer).toLowerCase().includes(q),
  );
}
export { mediaIndex } from "./media";
