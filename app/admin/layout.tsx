import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration | BM Group",
  robots: {
    index: false,
    follow: false,
  },
};

// Route protection for /admin/* (except /admin/login) is enforced by
// proxy.ts at the project root. Individual server components still
// call `getSession()` / `requireAdmin()` for type-safe session access.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">{children}</div>
  );
}
