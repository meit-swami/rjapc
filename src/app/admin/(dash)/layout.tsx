import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminDashLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
