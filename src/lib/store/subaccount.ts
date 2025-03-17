"use client";

import { DriftClient } from "@drift-labs/sdk";
import { PublicKey } from "@solana/web3.js";
import { createStore } from "zustand/vanilla";
import { Subaccount } from "../types";

export interface SubaccountState {
  subaccounts: Subaccount[];
  isLoading: boolean;
  error: Error | null;
  targetWalletAddress: string | null;
}

export interface SubaccountActions {
  setTargetWalletAddress: (address: string | null) => void;
  fetchSubaccounts: (
    driftClient: DriftClient,
    walletAddress?: string
  ) => Promise<void>;
  reset: () => void;
}

export type SubaccountStore = SubaccountState & SubaccountActions;

export const defaultInitState: SubaccountState = {
  subaccounts: [],
  isLoading: false,
  error: null,
  targetWalletAddress: null,
};

export const createSubaccountStore = (
  initState: SubaccountState = defaultInitState
) => {
  return createStore<SubaccountStore>()((set) => ({
    ...initState,

    setTargetWalletAddress: (address) => set({ targetWalletAddress: address }),

    fetchSubaccounts: async (driftClient, walletAddress) => {
      if (!driftClient) {
        set({ error: new Error("Drift client not initialized") });
        return;
      }

      try {
        set({ isLoading: true, error: null });

        let targetPublicKey: PublicKey;

        if (walletAddress) {
          targetPublicKey = new PublicKey(walletAddress);
        } else if (driftClient.wallet.publicKey) {
          targetPublicKey = driftClient.wallet.publicKey;
        } else {
          throw new Error("No wallet connected or provided");
        }

        // Fetch user stats to get subaccount IDs
        const userStats = driftClient.getUserStats();

        console.log("User stats:", userStats);

        const fetchedSubaccounts: Subaccount[] = [];

        set({
          subaccounts: fetchedSubaccounts,
          isLoading: false,
        });
      } catch (err) {
        console.error("Failed to fetch subaccounts:", err);
        set({
          error: err instanceof Error ? err : new Error(String(err)),
          isLoading: false,
          subaccounts: [],
        });
      }
    },

    reset: () => set(defaultInitState),
  }));
};
