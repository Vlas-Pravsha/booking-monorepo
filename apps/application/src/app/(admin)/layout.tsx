import type { Metadata } from "next";

import { AuthGuard } from "@/features/auth/session";
import { AdminFooter } from "@/widgets/admin-footer";
import { AdminSidebar } from "@/widgets/admin-sidebar";

export const metadata: Metadata = {
  title: "Адмін-панель | TableReserve",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard mode="protected">
      <div className="admin-experience flex min-h-screen">
        <div className="fixed inset-y-0 left-0 z-50 w-72">
          <AdminSidebar className="h-full rounded-none border-x-0 border-y-0 border-r" />
        </div>
        <div className="ml-72 flex min-w-0 flex-1 flex-col">
          <div className="admin-shell flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <main className="mx-auto w-full max-w-7xl">{children}</main>
          </div>
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <AdminFooter />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
