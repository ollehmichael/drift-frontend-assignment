"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/providers/app";
import { X } from "lucide-react";

export function ViewAddressIndicator() {
  const { viewAddress, walletAddress, setViewAddress } = useAppContext();

  // If no view address or it's the same as the connected wallet, don't show anything
  if (!viewAddress || (walletAddress && viewAddress === walletAddress)) {
    return null;
  }

  const handleClearViewAddress = () => {
    setViewAddress(null);
  };

  return (
    <div className="flex items-center space-x-2 py-2">
      <Badge variant="outline" className="font-normal text-xs">
        Viewing
      </Badge>
      <span className="text-xs font-mono">
        {viewAddress.slice(0, 4)}...{viewAddress.slice(-4)}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5"
        onClick={handleClearViewAddress}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
