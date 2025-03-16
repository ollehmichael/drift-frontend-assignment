"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSolana } from "@/hooks/useSolana";
import { useAppContext } from "@/providers/app";
import { useEffect } from "react";

export function WalletBalance() {
  const { balance, isLoading, getBalance } = useSolana();
  const { connected } = useAppContext();

  useEffect(() => {
    if (connected) {
      getBalance();
    }
  }, [connected, getBalance]);

  if (!connected) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
        <CardDescription>Your current SOL balance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            {isLoading
              ? "Loading..."
              : balance !== null
              ? `${balance.toFixed(4)} SOL`
              : "Error loading balance"}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={getBalance}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
