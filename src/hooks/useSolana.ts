"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

export function useSolana() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    try {
      setIsLoading(true);
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey]);

  // Fetch balance when wallet is connected
  useEffect(() => {
    getBalance();
  }, [getBalance, publicKey]);

  // Send SOL to another wallet
  const sendSol = async (recipient: string, amount: number) => {
    if (!publicKey) return { success: false, message: "Wallet not connected" };

    try {
      setIsLoading(true);
      const recipientPubKey = new PublicKey(recipient);
      const transaction = new Transaction().add(
        // Create a transfer instruction
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      // Refresh balance
      await getBalance();

      return { success: true, signature };
    } catch (error) {
      console.error("Error sending SOL:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    balance,
    isLoading,
    getBalance,
    sendSol,
    publicKey,
  };
}
