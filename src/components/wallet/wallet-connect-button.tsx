"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/providers/app";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export function WalletConnectButton() {
  const { connected, connecting, walletAddress, disconnect } = useAppContext();
  const { setVisible } = useWalletModal();
  const [truncatedAddress, setTruncatedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (walletAddress) {
      const start = walletAddress.slice(0, 4);
      const end = walletAddress.slice(-4);
      setTruncatedAddress(`${start}...${end}`);
    } else {
      setTruncatedAddress(null);
    }
  }, [walletAddress]);

  const handleConnect = () => {
    setVisible(true);
  };

  if (connected && walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="font-mono">
          {truncatedAddress}
        </Button>
        <Button variant="destructive" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={connecting}>
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
