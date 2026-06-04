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
  phone: z.string().min(7, "Phone number is required"),
  platform: z.string().min(1, "Platform is required"),
  asset_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  niche: z.string().min(2, "Niche is required"),
  country: z.string().min(1, "Audience Geography is required"),
  asset_age: z.string().min(1, "Asset Age is required"),
  audience_size: z.coerce.number().min(1, "Audience size is required"),
  monthly_reach: z.string().min(1, "Monthly Reach/Traffic is required"),
  revenue_last_12_months: z.coerce.number().min(0).optional(),
  average_monthly_profit: z.coerce.number().min(0).optional(),
  asking_price: z.coerce.number().min(1, "Expected price is required"),
  screenshot_url: z.string().min(1, "Screenshot upload is required"),
  reason_for_selling: z.string().optional(),
  ownership_confirmed: z.boolean().refine((val) => val === true, "You must confirm ownership"),
  monetization_status: z.array(z.string()).min(1, "Select at least one monetization option"),
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
