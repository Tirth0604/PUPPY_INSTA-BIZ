import { findPuppy } from "@/lib/catalogue";
export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const data = findPuppy(slug);
  return data
    ? Response.json({ success: true, data })
    : Response.json(
        { success: false, message: "Puppy not found." },
        { status: 404 },
      );
}
