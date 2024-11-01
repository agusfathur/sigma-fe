"use client";
import AppShell from "@/components/app-shell";
import { Layout } from "@/components/custom/layout";
import { ThemeProvider } from "@/components/theme-provider";
import AdminNavbar from "./nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppShell>
          <Layout>
            <Layout.Header>
              <AdminNavbar />
            </Layout.Header>
            <Layout.Body>{children}</Layout.Body>
          </Layout>
        </AppShell>
      </ThemeProvider>
    </div>
  );
}
