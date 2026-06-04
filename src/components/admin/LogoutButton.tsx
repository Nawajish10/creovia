"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/admin-auth";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-error transition-colors px-3 py-2 rounded-lg hover:bg-error/10"
      aria-label="Logout"
    >
      <span className="material-symbols-outlined text-[20px]">logout</span>
      Logout
    </button>
  );
}
