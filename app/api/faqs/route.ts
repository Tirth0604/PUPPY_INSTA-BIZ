import { searchFAQs } from "@/lib/catalogue";
export function GET(request: Request) {
  const data = searchFAQs(new URL(request.url).searchParams.get("q") || "");
  return Response.json({ success: true, data, count: data.length });
}
