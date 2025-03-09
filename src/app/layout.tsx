import { AppProvider } from "@/providers/app";
import { Inter } from "next/font/google";
import type { Metadata } from "next/types";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drift Protocol",
  description: "Decentralized trading platform on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
