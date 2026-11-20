export function GET() {
  return Response.json(
    {
      success: true,
      application: "teddypups-assessment",
      storageConfigured:
        !!process.env.DATABASE_URL || process.env.ENQUIRY_STORAGE === "sqlite",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
