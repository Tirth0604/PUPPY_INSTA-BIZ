import type { Metadata } from "next";
import "./reference.css";
import "./globals.css";
import templates from "@/data/templates.json";
import { Markup } from "@/components/Markup";
import { Navigation } from "@/components/layout/Navigation";
import { MascotBuddies } from "@/components/layout/MascotBuddies";
import { PageTransition } from "@/components/layout/PageTransition";
import { Reveals } from "@/components/layout/Reveals";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "TeddyPups U.A.E. · Assessment demo",
    template: "%s · TeddyPups assessment",
  },
  description:
    "Independent technical assessment recreation. Not the official business; puppy listings are demonstration data.",
  robots: { index: false, follow: false },
  icons: { icon: "/brand/logo.png" },
  openGraph: {
    title: "TeddyPups assessment demonstration",
    description:
      "Independent assessment website. Not current commercial inventory.",
    images: ["/brand/logo.png"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="Veu4Sq_variable hpvSLW_variable _91XIoq_variable"
    >
      <body>
        <Markup html={templates.curtain} />
        <a className="demo-skip" href="#main">
          Skip to content
        </a>
        <Markup html={templates.header} />
        <Navigation />
        <main
          id="main"
          className="relative pt-[var(--header-h)] outline-none"
          tabIndex={-1}
        >
          {children}
        </main>
        <Markup html={templates.footer} />
        <Markup html={templates.sticky} />
        <div className="assessment-banner">
          Assessment demonstration · Not the official business · Listings are
          sample data
        </div>
        <Reveals />
        <MascotBuddies />
        <PageTransition />
      </body>
    </html>
  );
}
