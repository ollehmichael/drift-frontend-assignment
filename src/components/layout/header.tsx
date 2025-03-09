"use client";

import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Menu"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <div className="font-bold">Drift Protocol</div>
      </div>
      <div className="hidden font-bold lg:block">Drift Protocol</div>
      <div className="flex items-center gap-4">
        <ConnectWalletButton />
      </div>
    </header>
  );
}
