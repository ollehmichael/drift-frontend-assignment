"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/providers/app";
import { Loader2, Wallet } from "lucide-react";

export function ConnectWalletButton() {
  const { connected, connecting, walletAddress, connect, disconnect } =
    useAppContext();

  if (connecting) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (connected && walletAddress) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(walletAddress);
            }}
          >
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={disconnect}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={connect}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
