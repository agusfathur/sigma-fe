"use client";
import { Layout } from "@/components/custom/layout";
import { ThemeProvider } from "@/components/theme-provider";
import UserNavbar from "./nav";
import UserAppShell from "@/components/user-app-shell";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <UserAppShell>
          <Layout>
            <Layout.Header>
              <UserNavbar />
            </Layout.Header>
            <Layout.Body>{children}</Layout.Body>
          </Layout>
        </UserAppShell>
      </ThemeProvider>
    </div>
  );
}
