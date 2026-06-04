import { ValuationFormValues, SellerFormValues, BuyerFormValues } from "@/types/forms";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitValuationForm(data: ValuationFormValues) {
  await delay(1500);
  console.log("Valuation form submitted:", data);
  return { success: true, message: "Valuation request received successfully." };
}

export async function submitSellerForm(data: SellerFormValues) {
  await delay(1500);
  console.log("Seller form submitted:", data);
  return { success: true, message: "Seller application received successfully." };
}

export async function submitBuyerForm(data: BuyerFormValues) {
  await delay(1500);
  console.log("Buyer form submitted:", data);
  return { success: true, message: "Buyer inquiry received successfully." };
}
