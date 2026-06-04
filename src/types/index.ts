export interface Asset {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  revenue: number;
  audienceSize: number;
  thumbnailUrl: string;
}

export type FormState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  successMessage?: string;
};
