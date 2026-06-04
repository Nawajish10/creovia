import { z } from "zod";

export const valuationFormSchema = z.object({
  assetUrl: z.string().url("Please enter a valid URL"),
  category: z.string().min(1, "Please select a category"),
  monthlyRevenue: z.coerce.number().min(0).optional(),
  email: z.string().email("Please enter a valid email"),
});

export type ValuationFormValues = z.infer<typeof valuationFormSchema>;

export const sellerFormSchema = z.object({
  assetName: z.string().min(2, "Asset name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Please provide more detail"),
  askingPrice: z.coerce.number().min(1, "Price must be greater than 0"),
  email: z.string().email("Please enter a valid email"),
});

export type SellerFormValues = z.infer<typeof sellerFormSchema>;

export const buyerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Please provide more detail about what you are looking for"),
});

export type BuyerFormValues = z.infer<typeof buyerFormSchema>;
