import parse, {
  Element,
  domToReact,
  attributesToProps,
  type HTMLReactParserOptions,
  type DOMNode,
} from "html-react-parser";
import { textContent } from "domutils";
import type { ReactNode } from "react";
import { whatsapp, whatsappPhone } from "@/lib/whatsapp";
/** Only build-time, sanitized reference presentation is accepted here. Never user HTML. */
export function Markup({
  html,
  slots = {},
  whatsappContext,
}: {
  html: string;
  slots?: Record<string, ReactNode>;
  whatsappContext?: string;
}) {
  const options: HTMLReactParserOptions = {
    replace(node) {
      if (!(node instanceof Element)) return;
      if (node.name === "script" || node.name === "iframe") return <></>;
      if (
        node.name === "a" &&
        node.attribs.href?.startsWith("/cdn-cgi/l/email-protection")
      ) {
        return (
          <a
            {...attributesToProps(node.attribs)}
            href={
              "mailto:" +
              (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@instabizweb.com")
            }
          >
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@instabizweb.com"}
          </a>
        );
      }
      if (node.name === "a" && node.attribs.href?.startsWith("tel:")) {
        const phone =
          process.env.NEXT_PUBLIC_CONTACT_PHONE || "+" + whatsappPhone;
        const content = domToReact(node.children as DOMNode[], options);
        return (
          <a {...attributesToProps(node.attribs)} href={"tel:" + phone}>
            {node.children.some(
              (c) => c.type === "text" && c.data.includes("971"),
            )
              ? phone
              : content}
          </a>
        );
      }
      if (
        node.name === "a" &&
        node.attribs.href === "https://www.instabizweb.com/"
      ) {
        const label = (node.attribs["aria-label"] || textContent(node)).trim();
        const destinations: Record<string, string | undefined> = {
          "Open in Google Maps":
            process.env.NEXT_PUBLIC_SHOWROOM_MAP_URL ||
            "https://www.google.com/maps/search/?api=1&query=Downtown%20Dubai%2C%20UAE",
          Instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
          TikTok: process.env.NEXT_PUBLIC_TIKTOK_URL,
          Facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
        };
        const href = destinations[label];
        if (href && href.startsWith("https://")) {
          return (
            <a
              {...attributesToProps(node.attribs)}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {domToReact(node.children as DOMNode[], options)}
            </a>
          );
        }
      }
      if (node.name === "demo-slot") return <>{slots[node.attribs.name]}</>;
      if (node.name === "a" && node.attribs.href?.includes("wa.me/")) {
        const props = attributesToProps(node.attribs);
        return (
          <a
            {...props}
            href={whatsapp(undefined, whatsappContext)}
            rel="noopener noreferrer"
            target="_blank"
          >
            {domToReact(node.children as DOMNode[], {
              ...options,
              replace(child, index) {
                if (
                  child.type === "text" &&
                  child.data.includes("+971 50 000 0000")
                ) {
                  return (
                    <>
                      {child.data.replace(
                        "+971 50 000 0000",
                        "+" + whatsappPhone.replace(/\D/g, ""),
                      )}
                    </>
                  );
                }
                return options.replace?.(child, index);
              },
            })}
          </a>
        );
      }
    },
  };
  return <>{parse(html, options)}</>;
}
