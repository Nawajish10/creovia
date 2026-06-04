import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Axcrivo",
};

import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="bg-surface-container-lowest border-b border-outline-variant/30 py-4 px-8 flex justify-between items-center">
        <h1 className="font-headline-sm text-on-surface">Axcrivo Admin</h1>
        <LogoutButton />
      </header>
      <main className="flex-1 p-8 max-w-[1600px] w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
