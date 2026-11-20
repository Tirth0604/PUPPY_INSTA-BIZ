import { filterPuppies } from "@/lib/catalogue";
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const filters = {
    breed: params.get("breed") || undefined,
    origin: params.get("origin") || undefined,
    collection: params.get("collection") || undefined,
    gender: params.get("gender") || undefined,
    status: params.get("status") || undefined,
  };
  if (
    (filters.origin && !["local", "imported"].includes(filters.origin)) ||
    (filters.collection && filters.collection !== "korean-teacup") ||
    (filters.gender && !["male", "female"].includes(filters.gender)) ||
    (filters.status && !["available", "adopted"].includes(filters.status))
  )
    return Response.json(
      { success: false, message: "Invalid filter." },
      { status: 400 },
    );
  const data = filterPuppies(filters);
  return Response.json({ success: true, data, count: data.length });
}
