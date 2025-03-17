"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { validateSolanaAddress } from "@/lib/utils";
import { useAppContext } from "@/providers/app";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { ExternalLink, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ConnectWalletButton } from "./connect-wallet-button";

export function WalletVerification() {
  const { connected, walletAddress, viewAddress, setViewAddress } =
    useAppContext();
  const wallet = useWallet();
  const [inputAddress, setInputAddress] = useState<string>(
    "4KFhG4roRexhFqttE3KZmHrwQrxThRyg5aLcs2WRXk1F"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [signatureStatus, setSignatureStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let isEffectActive = true;
    setBalanceError(null);

    const getBalance = async () => {
      if (!wallet.publicKey) return;

      try {
        const devnetConnection = clusterApiUrl("devnet");
        const response = await fetch(devnetConnection, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [wallet.publicKey.toString()],
          }),
        });

        const data = await response.json();

        if (isEffectActive) {
          if (data.error) {
            console.error("RPC error:", data.error);
            setBalanceError("Failed to fetch balance: " + data.error.message);
            setWalletBalance(null);
          } else {
            const solBalance = data.result.value / LAMPORTS_PER_SOL;
            console.log("Wallet balance:", solBalance, "SOL");
            setWalletBalance(solBalance);
          }
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
        if (isEffectActive) {
          setBalanceError("Failed to fetch balance. Network error.");
          setWalletBalance(null);
        }
      }
    };

    if (wallet.connected && wallet.publicKey) {
      getBalance();
    } else {
      setWalletBalance(null);
    }

    return () => {
      isEffectActive = false;
    };
  }, [isMounted, wallet.connected, wallet.publicKey]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value);
    setError(null);
  };

  const handleViewAddress = async () => {
    const validation = validateSolanaAddress(inputAddress);

    if (!validation.isValid) {
      setError(validation.error || "Invalid Solana address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setViewAddress(inputAddress);
    } catch (err) {
      setError("Failed to validate address");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseConnectedWallet = () => {
    if (connected && walletAddress) {
      setViewAddress(walletAddress);
      setInputAddress(walletAddress);
    }
  };

  const handleSignMessage = async () => {
    if (!wallet.signMessage) {
      setSignatureStatus({
        status: "error",
        message: "Wallet does not support message signing",
      });
      return;
    }

    setSignatureStatus({ status: "loading" });

    try {
      const message = new TextEncoder().encode(
        `Verify wallet connection: ${new Date().toISOString()}`
      );

      const signature = await wallet.signMessage(message);

      console.log("Message signed successfully:", {
        signature: Array.from(signature)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
        message: new TextDecoder().decode(message),
      });

      setSignatureStatus({
        status: "success",
        message: "Message signed successfully!",
      });
    } catch (err) {
      console.error("Error signing message:", err);
      setSignatureStatus({
        status: "error",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const openSolanaExplorer = (address: string) => {
    window.open(
      `https://explorer.solana.com/address/${address}?cluster=devnet`,
      "_blank"
    );
  };

  if (!isMounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallet Verification</CardTitle>
          <CardDescription>
            Connect your wallet or enter a Solana address to view its data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Verification</CardTitle>
        <CardDescription>
          Connect your wallet or enter a Solana address to view its data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Your Wallet</p>
            <ConnectWalletButton />
          </div>
          {connected && walletAddress && (
            <div className="rounded-md bg-muted p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-xs font-medium text-green-500">
                    Connected
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => openSolanaExplorer(walletAddress)}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm font-mono break-all mt-1">
                {walletAddress}
              </p>
              {walletBalance !== null ? (
                <p className="text-xs mt-1">
                  Balance: {walletBalance.toFixed(4)} SOL
                </p>
              ) : balanceError ? (
                <p className="text-xs mt-1 text-red-500">{balanceError}</p>
              ) : (
                <p className="text-xs mt-1">
                  <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                  Fetching balance...
                </p>
              )}
              <div className="flex space-x-2 mt-2">
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0"
                  onClick={handleUseConnectedWallet}
                >
                  Use this address
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0"
                  onClick={handleSignMessage}
                  disabled={signatureStatus.status === "loading"}
                >
                  {signatureStatus.status === "loading"
                    ? "Signing..."
                    : "Test Signing"}
                </Button>
              </div>
              {signatureStatus.status !== "idle" && (
                <div
                  className={`mt-2 text-xs ${
                    signatureStatus.status === "success"
                      ? "text-green-500"
                      : signatureStatus.status === "error"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {signatureStatus.message}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">View Any Address</p>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Solana address"
              value={inputAddress}
              onChange={handleAddressChange}
              className="font-mono text-xs"
            />
            <Button onClick={handleViewAddress} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  View
                </>
              )}
            </Button>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {viewAddress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Viewing Address</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => openSolanaExplorer(viewAddress)}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
            <div className="rounded-md bg-muted p-3">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-xs font-medium text-blue-500">
                  {connected && walletAddress === viewAddress
                    ? "Connected (Your Wallet)"
                    : "View Only (Not Connected)"}
                </span>
              </div>
              <p className="text-sm font-mono break-all mt-1">{viewAddress}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {connected && walletAddress === viewAddress
                ? "You are connected to this wallet and can perform transactions."
                : "You are only viewing this address. You cannot perform transactions on behalf of this wallet."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
