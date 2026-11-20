import { describe, it, expect } from "vitest";
import {
  puppies,
  families,
  faqs,
  filterPuppies,
  findPuppy,
  neighbours,
  searchFAQs,
  mediaIndex,
} from "@/lib/catalogue";
import { buildWhatsAppURL, whatsappMessage } from "@/lib/whatsapp";
import { enquirySchema } from "@/lib/validation";
import { existsSync } from "node:fs";
const valid = { name: "Demo Tester", phone: "+971 50 123 4567" };
describe("audited data integrity", () => {
  it("contains exact reference counts and unique routes", () => {
    expect(puppies).toHaveLength(42);
    expect(new Set(puppies.map((p) => p.slug)).size).toBe(42);
    expect(families).toHaveLength(64);
    expect(faqs).toHaveLength(9);
  });
  it("retains 15 available and 27 adopted profiles", () => {
    expect(filterPuppies({ status: "available" })).toHaveLength(15);
    expect(filterPuppies({ status: "adopted" })).toHaveLength(27);
  });
  it("does not invent local available stock", () =>
    expect(filterPuppies({ origin: "local", status: "available" })).toEqual(
      [],
    ));
  it("combines origin breed and status filters", () =>
    expect(
      filterPuppies({
        origin: "imported",
        breed: "poodle",
        status: "available",
      }).map((p) => p.slug),
    ).toEqual(["korean-teacup-poodle-female", "toy-poodle-male-female"]));
  it("normalizes hyphenated breed names", () =>
    expect(
      filterPuppies({ breed: "shih-tzu", status: "available" }),
    ).toHaveLength(2));
  it("returns no matches for unknown filters", () =>
    expect(filterPuppies({ breed: "unknown" })).toEqual([]));
  it("preserves unconventional slugs", () =>
    expect(findPuppy("shitzu-female")?.breed).toBe("Shih Tzu"));
  it("returns undefined for invalid profile", () =>
    expect(findPuppy("../../etc/passwd")).toBeUndefined());
  it("wraps navigation within availability status", () => {
    expect(neighbours(puppies[0]).previous.slug).toBe(
      "korean-teacup-pomeranian-male",
    );
    expect(neighbours(puppies[15]).previous.status).toBe("adopted");
    expect(neighbours(puppies[41]).next.slug).toBe("pomeranian-ace-boy");
  });
  it("has local files for every gallery item and video poster", () => {
    for (const media of [...puppies.flatMap((p) => p.media), ...families]) {
      expect(existsSync("public" + media.url), media.url).toBe(true);
      if (media.poster)
        expect(existsSync("public" + media.poster.url)).toBe(true);
    }
  });
  it("matches reference representative media counts", () =>
    expect([0, 1, 2, 3, 15].map((i) => puppies[i].media.length)).toEqual([
      2, 11, 4, 3, 4,
    ]));
});
describe("search and media navigation", () => {
  it("searches answer text ignoring case and whitespace", () =>
    expect(searchFAQs("  KOREA ")).toHaveLength(2));
  it("returns all notes for an empty query", () =>
    expect(searchFAQs("")).toHaveLength(9));
  it("returns no notes for an absent term", () =>
    expect(searchFAQs("xyzneverfound")).toEqual([]));
  it("wraps both directions and handles empty media", () => {
    expect(mediaIndex(0, -1, 4)).toBe(3);
    expect(mediaIndex(3, 1, 4)).toBe(0);
    expect(mediaIndex(0, 1, 0)).toBe(0);
  });
});
describe("enquiry validation", () => {
  it("normalizes phone and trims names", () =>
    expect(enquirySchema.parse({ ...valid, name: " Demo Tester " }).phone).toBe(
      "+971501234567",
    ));
  it.each(["0501234567", "+0123456789", "+123", "+971<script>", ""])(
    "rejects invalid phone %s",
    (phone) =>
      expect(enquirySchema.safeParse({ ...valid, phone }).success).toBe(false),
  );
  it("allows absent email and rejects malformed email", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
    expect(enquirySchema.safeParse({ ...valid, email: "x@" }).success).toBe(
      false,
    );
  });
  it("trims optional email addresses", () =>
    expect(
      enquirySchema.parse({ ...valid, email: " demo@example.com " }).email,
    ).toBe("demo@example.com"));
  it("rejects overlong messages", () =>
    expect(
      enquirySchema.safeParse({ ...valid, message: "x".repeat(3001) }).success,
    ).toBe(false));
  it("requires a meaningful name", () =>
    expect(enquirySchema.safeParse({ ...valid, name: " " }).success).toBe(
      false,
    ));
});
describe("WhatsApp", () => {
  it("encodes ampersands, punctuation and unicode", () => {
    const u = new URL(
      buildWhatsAppURL("+91 98981 24987", "Hi! Maltipoo & Cavapoo 🐾"),
    );
    expect(u.pathname).toBe("/919898124987");
    expect(u.searchParams.get("text")).toBe("Hi! Maltipoo & Cavapoo 🐾");
  });
  it("rejects an invalid destination", () =>
    expect(() => buildWhatsAppURL("0", "hi")).toThrow());
  it("uses similar-puppy intent for adopted dogs", () => {
    expect(whatsappMessage(puppies[15])).toContain("similar to Ace");
    expect(whatsappMessage(puppies[0])).toContain("Max (Maltipoo)");
  });
});
