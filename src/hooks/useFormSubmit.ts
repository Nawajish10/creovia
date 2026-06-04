import { useState } from "react";
import { FormState } from "@/types";

export function useFormSubmit<T>(
  submitFn: (data: T) => Promise<{ success: boolean; message: string }>
) {
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const handleSubmit = async (data: T) => {
    setFormState({ isLoading: true, isSuccess: false, isError: false });
    try {
      const response = await submitFn(data);
      if (response.success) {
        setFormState({
          isLoading: false,
          isSuccess: true,
          isError: false,
          successMessage: response.message,
        });
      } else {
        throw new Error(response.message || "Submission failed");
      }
    } catch (error: any) {
      setFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: error.message || "An unexpected error occurred",
      });
    }
  };

  const resetFormState = () => {
    setFormState({ isLoading: false, isSuccess: false, isError: false });
  };

  return { formState, handleSubmit, resetFormState };
}
