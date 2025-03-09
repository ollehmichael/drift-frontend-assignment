"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { ThemeProvider } from "next-themes"

type AppContextType = {
  connected: boolean
  connecting: boolean
  walletAddress: string | null
  connect: () => void
  disconnect: () => void
  selectedSubaccount: string | null
  setSelectedSubaccount: (id: string | null) => void
}

const AppContext = createContext<AppContextType>({
  connected: false,
  connecting: false,
  walletAddress: null,
  connect: () => {},
  disconnect: () => {},
  selectedSubaccount: null,
  setSelectedSubaccount: () => {},
})

export const useAppContext = () => useContext(AppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [selectedSubaccount, setSelectedSubaccount] = useState<string | null>(null)

  const connect = () => {
    setConnecting(true)
    // Simulate connection delay
    setTimeout(() => {
      setConnected(true)
      setConnecting(false)
      setWalletAddress("8xDrJGHyDXsQJj1F1nvZpCLhQEkxYfmAGQgJJPrxpPqd")
    }, 1000)
  }

  const disconnect = () => {
    setConnected(false)
    setWalletAddress(null)
    setSelectedSubaccount(null)
  }

  return (
    <AppContext.Provider
      value={{
        connected,
        connecting,
        walletAddress,
        connect,
        disconnect,
        selectedSubaccount,
        setSelectedSubaccount,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}

