"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/providers/app";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export function WalletVerification() {
  const { connected, walletAddress, connect, disconnect } = useAppContext();
  const [viewAddress, setViewAddress] = useState<string>(
    "4KFhG4roRexhFqttE3KZmHrwQrxThRyg5aLcs2WRXk1F"
  );
  const [isViewingAddress, setIsViewingAddress] = useState<boolean>(false);

  const handleViewAddress = () => {
    setIsViewingAddress(true);
    // In a future step, we'll implement fetching data for this address
  };

  const handleResetView = () => {
    setIsViewingAddress(false);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Wallet Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connection Status:</span>
            {connected ? (
              <Badge className="bg-green-500 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>Connected</span>
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                <span>Not Connected</span>
              </Badge>
            )}
          </div>

          {connected && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Wallet Address:</span>
              <span className="font-mono text-xs">{walletAddress}</span>
            </div>
          )}

          <div className="flex justify-end">
            {connected ? (
              <Button variant="destructive" size="sm" onClick={disconnect}>
                Disconnect
              </Button>
            ) : (
              <Button size="sm" onClick={connect}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">View Wallet Data</div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter wallet address"
                value={viewAddress}
                onChange={(e) => setViewAddress(e.target.value)}
                className="font-mono text-xs"
              />
              <Button size="sm" onClick={handleViewAddress}>
                View
              </Button>
            </div>

            {isViewingAddress && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Viewing Address:</span>
                  <span className="font-mono text-xs">{viewAddress}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Note: Drift API integration will be implemented in the next
                  step.
                </div>
                <Button size="sm" variant="outline" onClick={handleResetView}>
                  Reset
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
