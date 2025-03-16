"use client";

import type React from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ViewAddressIndicator } from "@/components/wallet/view-address-indicator";
import { useState } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <ViewAddressIndicator />
          {children}
        </main>
      </div>
    </div>
  );
}
