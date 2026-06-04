import { z } from "zod"

// Phone: optional but if provided must be a recognizable format
const phoneSchema = z.string()
  .optional()
  .refine(
    (val) => !val || /^\+?[\d\s\-().]{7,20}$/.test(val),
    { message: "Enter a valid phone number" }
  )

export const valuationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Enter a valid phone number").max(20),
  platform: z.string().min(1, "Platform is required"),
  audience_size: z.coerce.number().min(1, "Audience size must be at least 1"),
  engagement_rate: z.coerce.number().min(0).max(100),
  country: z.string(),
  monthly_revenue: z.coerce.number().min(0),
  asking_price: z.coerce.number().optional(),
  niche: z.string().optional(),
  asset_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  // Honeypot — must be empty. Bots fill this, humans don't see it.
  website: z.string().max(0, "Bot detected").optional(),
})

export const sellerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: phoneSchema,
  platform: z.string().min(1, "Platform is required"),
  audience_size: z.coerce.number().min(1, "Required"),
  country: z.string().min(1, "Required"),
  niche: z.string().optional(),
  monthly_revenue: z.coerce.number().min(0),
  asking_price: z.coerce.number().min(1, "Required"),
  asset_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  reason_for_selling: z.string().optional(),
  // Honeypot
  website: z.string().max(0, "Bot detected").optional(),
})

export const buyerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: phoneSchema,
  budget: z.coerce.number().min(1, "Budget is required"),
  platform: z.string().min(1, "Platform is required"),
  niche: z.string().optional(),
  country_preference: z.string().optional(),
  // Honeypot
  website: z.string().max(0, "Bot detected").optional(),
})
