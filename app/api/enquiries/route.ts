import { enquirySchema } from "@/lib/validation";
import { puppies } from "@/lib/catalogue";
import { saveEnquiry, RateLimitError } from "@/lib/enquiry-store";
export const runtime = "nodejs";
const response = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let sameOrigin = false;
    try {
      const url = new URL(origin);
      sameOrigin =
        url.origin === new URL(request.url).origin ||
        url.host === request.headers.get("host");
    } catch {
      /* Malformed origins are rejected below. */
    }
    if (!sameOrigin)
      return response(
        { success: false, message: "Request origin is not allowed." },
        403,
      );
  }
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return response({ success: false, message: "Use application/json." }, 415);
  const max = 16384;
  if (Number(request.headers.get("content-length") || 0) > max)
    return response({ success: false, message: "Request is too large." }, 413);
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw Error();
    let length = 0;
    const chunks: Uint8Array[] = [];
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > max) {
        await reader.cancel();
        return response(
          { success: false, message: "Request is too large." },
          413,
        );
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return response({ success: false, message: "Invalid JSON request." }, 400);
  }
  const result = enquirySchema.safeParse(body);
  if (!result.success)
    return response(
      {
        success: false,
        message: "Please check your details.",
        errors: result.error.flatten().fieldErrors,
      },
      422,
    );
  if (result.data.website)
    return response({ success: false, message: "Submission rejected." }, 400);
  if (result.data.puppyId && !puppies.some((p) => p.id === result.data.puppyId))
    return response(
      { success: false, message: "The selected puppy was not found." },
      422,
    );
  try {
    // Vercel overwrites this trusted edge header. Locally all requests share a bucket.
    const client = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0] ||
        "unknown"
      : "local";
    const saved = await saveEnquiry(result.data, client);
    return response(
      {
        success: true,
        message:
          "Demo enquiry saved. No message was sent to the reference business.",
        id: saved.id,
        duplicate: saved.duplicate,
      },
      saved.duplicate ? 200 : 201,
    );
  } catch (error) {
    if (error instanceof RateLimitError)
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "600",
            "Cache-Control": "no-store",
          },
        },
      );
    return response(
      {
        success: false,
        message:
          "Enquiry storage is currently unavailable. Please try again later.",
      },
      503,
    );
  }
}
