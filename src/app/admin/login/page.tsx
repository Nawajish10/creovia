"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyCredentials, verifyPasscode } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await verifyCredentials(formData);

    if (result.success) {
      setStep(2);
    } else {
      setError(result.error || "Invalid credentials");
    }
    setIsLoading(false);
  }

  async function handlePasscodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await verifyPasscode(formData);

    if (result.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(result.error || "Invalid passcode");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-low border border-outline-variant rounded-3xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <span className="material-symbols-outlined text-[32px]">shield_person</span>
          </div>
          <h1 className="font-headline-md text-on-surface">Admin Login</h1>
          <p className="text-on-surface-variant text-sm mt-2">
            {step === 1 ? "Enter your credentials to continue" : "Enter the 6-digit passcode"}
          </p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6 text-sm flex gap-2 items-center">
            <span className="material-symbols-outlined text-[20px]">error</span>
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">Username</label>
              <input
                type="text"
                name="username"
                required
                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 flex justify-center items-center gap-2"
            >
              {isLoading ? "Verifying..." : "Continue"}
              {!isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">6-Digit Passcode</label>
              <input
                type="text"
                name="passcode"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-center tracking-widest font-jetbrains text-lg"
                placeholder="000000"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 flex justify-center items-center gap-2"
            >
              {isLoading ? "Verifying..." : "Login"}
              {!isLoading && <span className="material-symbols-outlined text-[20px]">login</span>}
            </button>
            <button
              type="button"
              onClick={() => { setStep(1); setError(""); }}
              className="w-full text-on-surface-variant text-sm font-medium py-2 hover:text-on-surface transition-colors"
            >
              Back to step 1
            </button>
          </form>
        )}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Site
          </a>
        </div>
      </div>
    </div>
  );
}
