import { families } from "@/lib/catalogue";
export function GET() {
  return Response.json({
    success: true,
    data: families,
    count: families.length,
  });
}
