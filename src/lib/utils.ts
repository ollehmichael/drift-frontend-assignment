import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

export function formatPercentage(
  value: number,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
    ...options,
  }).format(value / 100);
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function getAssetValue(balance: number): number {
  // convert balance to value
  return balance;
}

/**
 * Validates a Solana address
 * @param address The address to validate
 * @returns An object with validation result and error message if any
 */
export function validateSolanaAddress(address: string): {
  isValid: boolean;
  error?: string;
} {
  // Basic validation - check if it's a string with the correct length
  if (!address || typeof address !== "string") {
    return { isValid: false, error: "Address is required" };
  }

  // Solana addresses are 44 characters long (base58 encoded)
  if (address.length !== 44) {
    return { isValid: false, error: "Invalid address length" };
  }

  // Check if the address contains only base58 characters
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
  if (!base58Regex.test(address)) {
    return { isValid: false, error: "Address contains invalid characters" };
  }

  return { isValid: true };
}
