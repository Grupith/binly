"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import BreadcrumbHeader from "@/components/breadcrumb-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("sidebar_open");
    if (stored !== null) setSidebarOpen(stored === "true");
    setHydrated(true);
  }, []);

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarOpen(isOpen);
    localStorage.setItem("sidebar_open", isOpen.toString());
  };

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider>
        {hydrated && (
          <SidebarProvider
            open={sidebarOpen}
            onOpenChange={handleSidebarToggle}
          >
            <AppSidebar />
            <SidebarInset>
              <BreadcrumbHeader />
              <main className="flex-1 dark:bg-gray-900 dark:text-gray-200 px-4 pt-2">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        )}
      </WorkspaceProvider>
    </QueryClientProvider>
  );
}
