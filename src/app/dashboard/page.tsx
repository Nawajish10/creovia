"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { UserAuth } from "@/features/dashboard/components/UserAuth";
import { UserDashboard } from "@/features/dashboard/components/UserDashboard";

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession) {
        document.cookie = `sb-access-token=${currentSession.access_token}; path=/; max-age=${currentSession.expires_in}; SameSite=Lax; Secure`;
      }
      setIsLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (newSession) {
        document.cookie = `sb-access-token=${newSession.access_token}; path=/; max-age=${newSession.expires_in}; SameSite=Lax; Secure`;
      } else {
        document.cookie = `sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <PageWrapper className="full-bg-image !bg-transparent min-h-screen">
      <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-24 flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-12 text-center shadow-sm w-full max-w-md">
            <div className="animate-spin text-primary inline-block w-8 h-8 border-[3px] border-current border-t-transparent rounded-full mb-4" style={{ color: "#003fd8" }}></div>
            <p className="text-on-surface-variant text-sm" style={{ color: "#434656" }}>Checking authentication...</p>
          </div>
        ) : session ? (
          <div className="w-full">
            <UserDashboard 
              userEmail={session.user.email || ""} 
              onLogout={() => setSession(null)} 
            />
          </div>
        ) : (
          <div className="w-full">
            <UserAuth 
              onAuthSuccess={() => {
                supabase.auth.getSession().then(({ data: { session: updatedSession } }) => {
                  setSession(updatedSession);
                });
              }} 
            />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
