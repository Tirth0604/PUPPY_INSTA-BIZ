export interface Media {
  id: string;
  url: string;
  kind: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  focalX: number;
  focalY: number;
  color: string;
  poster: Media | null;
}
export interface Puppy {
  id: string;
  slug: string;
  name: string;
  breed: string;
  gender: string;
  age_display: string;
  origin: "local" | "imported";
  status: "available" | "adopted";
  sort_order: number;
  color: string;
  media: Media[];
}
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}
