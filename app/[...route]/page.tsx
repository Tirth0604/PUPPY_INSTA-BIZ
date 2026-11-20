export const dynamicParams = false;
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ContentPage,
  pageNames,
  type PageName,
} from "@/components/ContentPage";
import { PuppyProfile } from "@/components/puppies/PuppyProfile";
import { findPuppy, puppies } from "@/lib/catalogue";
type Props = {
  params: Promise<{ route: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export function generateStaticParams() {
  return [
    ...pageNames.filter((n) => n !== "home").map((n) => ({ route: [n] })),
    ...puppies.map((p) => ({ route: ["puppies", p.slug] })),
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { route } = await params;
  const p =
    route[0] === "puppies" && route[1] ? findPuppy(route[1]) : undefined;
  return {
    title: p
      ? `${p.name}, ${p.breed}${p.status === "adopted" ? " · Gone home" : ""}`
      : route.join(" ").replaceAll("-", " "),
    description: p
      ? `Assessment profile for ${p.name}. ${p.gender}, ${p.age_display}. Demonstration data, not current inventory.`
      : "TeddyPups independent assessment demonstration.",
  };
}
export default async function Page({ params, searchParams }: Props) {
  const { route } = await params;
  const search = await searchParams;
  if (route.length === 2 && route[0] === "puppies") {
    const p = findPuppy(route[1]);
    if (!p) notFound();
    return <PuppyProfile puppy={p} />;
  }
  if (
    route.length !== 1 ||
    !pageNames.includes(route[0] as PageName) ||
    route[0] === "home"
  )
    notFound();
  return (
    <ContentPage
      name={route[0] as PageName}
      filters={{
        breed: typeof search.breed === "string" ? search.breed : undefined,
        origin: typeof search.origin === "string" ? search.origin : undefined,
        collection:
          typeof search.collection === "string" ? search.collection : undefined,
        gender: typeof search.gender === "string" ? search.gender : undefined,
      }}
    />
  );
}
