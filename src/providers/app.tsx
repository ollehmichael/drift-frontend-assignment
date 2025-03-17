"use client";

import type React from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";
import { SolanaWalletProvider } from "./solana-wallet";
import { SubaccountStoreProvider } from "./subaccount-store";

type AppContextType = {
  connected: boolean;
  connecting: boolean;
  walletAddress: string | null;
  viewAddress: string | null;
  connect: () => void;
  disconnect: () => void;
  selectedSubaccount: string | null;
  setSelectedSubaccount: (id: string | null) => void;
  setViewAddress: (address: string | null) => void;
};

const AppContext = createContext<AppContextType>({
  connected: false,
  connecting: false,
  walletAddress: null,
  viewAddress: null,
  connect: () => {},
  disconnect: () => {},
  selectedSubaccount: null,
  setSelectedSubaccount: () => {},
  setViewAddress: () => {},
});

export const useAppContext = () => useContext(AppContext);

export function AppProviderContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    connected,
    connecting,
    publicKey,
    select,
    disconnect: walletDisconnect,
    wallets,
  } = useWallet();
  const [selectedSubaccount, setSelectedSubaccount] = useState<string | null>(
    null
  );
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [viewAddress, setViewAddress] = useState<string | null>(null);

  // Update wallet address when publicKey changes
  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toString());
    } else {
      setWalletAddress(null);
    }
  }, [publicKey]);

  const connect = () => {
    // Find the first available wallet adapter
    const firstWallet = wallets[0];
    if (firstWallet) {
      select(firstWallet.adapter.name);
    }
  };

  const disconnect = () => {
    walletDisconnect();
    setSelectedSubaccount(null);
  };

  return (
    <AppContext.Provider
      value={{
        connected,
        connecting,
        walletAddress,
        viewAddress,
        connect,
        disconnect,
        selectedSubaccount,
        setSelectedSubaccount,
        setViewAddress,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SolanaWalletProvider>
      <SubaccountStoreProvider>
        <AppProviderContent>{children}</AppProviderContent>
      </SubaccountStoreProvider>
    </SolanaWalletProvider>
  );
}
