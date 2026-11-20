import { z } from "zod";
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s().-]/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^\+[1-9]\d{7,14}$/,
          "Include a valid country code, e.g. +971 50 123 4567.",
        ),
    ),
  email: z
    .string()
    .trim()
    .max(320)
    .pipe(
      z.union([z.literal(""), z.email("Please enter a valid email address.")]),
    )
    .optional()
    .default(""),
  area: z.string().trim().max(160).optional().default(""),
  puppyId: z.string().max(100).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  website: z.string().max(500).optional().default(""),
  sourcePage: z
    .string()
    .max(200)
    .regex(/^\/(?!\/)/)
    .optional()
    .default("/contact"),
  idempotencyKey: z.uuid().optional(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
