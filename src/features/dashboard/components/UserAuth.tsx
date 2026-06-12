"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface UserAuthProps {
  onAuthSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export function UserAuth({ onAuthSuccess, title = "Welcome to Axcrivo", subtitle = "Access your digital asset valuation dashboard" }: UserAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync session changes to cookies for SSR support
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${session.expires_in}; SameSite=Lax; Secure`;
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      } else {
        document.cookie = `sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onAuthSuccess]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setSuccess("Signed in successfully!");
      } else {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;
        
        if (data.session) {
          setSuccess("Account created and signed in!");
        } else {
          setSuccess("Account created! Please check your email to verify your subscription.");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <div 
          className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary"
          style={{ color: "#003fd8" }}
        >
          <span className="material-symbols-outlined text-[32px]">vpn_key</span>
        </div>
        <h2 
          className="font-headline-sm text-on-surface text-2xl" 
          style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}
        >
          {title}
        </h2>
        <p className="text-on-surface-variant text-sm mt-2 font-body-md" style={{ color: "#434656" }}>
          {subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface-container-low p-1.5 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
          className={`flex-1 text-center py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
            isLogin 
              ? "bg-white text-primary shadow-sm" 
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          style={{ 
            fontFamily: "var(--font-inter)", 
            color: isLogin ? "#003fd8" : "#434656",
            minHeight: "unset"
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
          className={`flex-1 text-center py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
            !isLogin 
              ? "bg-white text-primary shadow-sm" 
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          style={{ 
            fontFamily: "var(--font-inter)", 
            color: !isLogin ? "#003fd8" : "#434656",
            minHeight: "unset"
          }}
        >
          Register
        </button>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6 text-sm flex gap-2 items-center border border-error/10">
          <span className="material-symbols-outlined text-[20px] text-error">error</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-secondary/10 text-on-secondary-container p-4 rounded-xl mb-6 text-sm flex gap-2 items-center border border-secondary/20">
          <span className="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-on-primary font-medium py-3 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 mt-2 flex justify-center items-center gap-2 cursor-pointer"
          style={{
            backgroundColor: "#003fd8",
            color: "#ffffff",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "14px"
          }}
        >
          {isLoading ? "Please wait..." : isLogin ? "Login to Dashboard" : "Create Account"}
          {!isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
        </button>
      </form>
    </div>
  );
}
