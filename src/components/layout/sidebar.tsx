"use client";

import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app";
import {
  Layers,
  LayoutDashboard,
  ListOrdered,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  open: boolean;
}

export function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname();
  const { selectedSubaccount } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const baseUrl = selectedSubaccount
    ? `/subaccounts/${selectedSubaccount}`
    : "";

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Wallet Connection",
      icon: Wallet,
      href: "/wallet-verification",
      active: pathname === "/wallet-verification",
    },
    {
      label: "Subaccounts",
      icon: Users,
      href: "/subaccounts",
      active: pathname === "/subaccounts",
    },
    {
      label: "Positions",
      icon: Layers,
      href: `${baseUrl}/positions`,
      active:
        pathname === `${baseUrl}/positions` || pathname.includes("/positions"),
      disabled: !selectedSubaccount,
    },
    {
      label: "Orders",
      icon: ListOrdered,
      href: `${baseUrl}/orders`,
      active: pathname === `${baseUrl}/orders` || pathname.includes("/orders"),
      disabled: !selectedSubaccount,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-[var(--sidebar-width)] flex-col border-r bg-card pt-16 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.disabled ? "#" : route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                route.active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                route.disabled && "pointer-events-none opacity-50"
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          {selectedSubaccount ? (
            <div>
              <div className="font-medium">Active Subaccount</div>
              <div className="truncate">{selectedSubaccount}</div>
            </div>
          ) : (
            <div>No subaccount selected</div>
          )}
        </div>
      </div>
    </aside>
  );
}
