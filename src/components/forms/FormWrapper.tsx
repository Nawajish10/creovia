import { ReactNode } from "react";
import { FormState } from "@/types";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  children: ReactNode;
  formState: FormState;
  className?: string;
}

export function FormWrapper({ children, formState, className }: FormWrapperProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {formState.isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {formState.errorMessage || "Something went wrong. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {formState.isSuccess && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            {formState.successMessage || "Form submitted successfully."}
          </AlertDescription>
        </Alert>
      )}

      <div className={cn("transition-opacity", formState.isLoading && "opacity-50 pointer-events-none")}>
        {children}
      </div>

      {formState.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
