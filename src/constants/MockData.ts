import { Asset, Market, Order, Position, Subaccount } from "@/lib/types";

export const MOCK_MARKETS: Market[] = [
  { id: "SOL-PERP", name: "SOL-PERP", price: 65.78 },
  { id: "BTC-PERP", name: "BTC-PERP", price: 41800 },
  { id: "ETH-PERP", name: "ETH-PERP", price: 2180 },
  { id: "AVAX-PERP", name: "AVAX-PERP", price: 29.25 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-1",
    market: "SOL-PERP",
    type: "limit",
    side: "buy",
    size: 5,
    price: 62.5,
    status: "open",
    filled: 0,
    timestamp: new Date().getTime() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    id: "order-2",
    market: "BTC-PERP",
    type: "stop",
    side: "sell",
    size: 0.1,
    price: 43500,
    status: "open",
    filled: 0,
    timestamp: new Date().getTime() - 1000 * 60 * 120, // 2 hours ago
  },
  {
    id: "order-3",
    market: "ETH-PERP",
    type: "limit",
    side: "buy",
    size: 0.8,
    price: 2150,
    status: "partially_filled",
    filled: 0.3,
    timestamp: new Date().getTime() - 1000 * 60 * 15, // 15 minutes ago
  },
  {
    id: "order-4",
    market: "AVAX-PERP",
    type: "market",
    side: "sell",
    size: 15,
    price: 0,
    status: "filled",
    filled: 15,
    timestamp: new Date().getTime() - 1000 * 60 * 5, // 5 minutes ago
  },
];

export const MOCK_POSITIONS: Position[] = [
  {
    id: "pos-1",
    market: "SOL-PERP",
    size: 10,
    side: "long",
    entryPrice: 63.45,
    markPrice: 65.78,
    pnl: 23.3,
    pnlPercentage: 3.67,
    liquidationPrice: 42.18,
  },
  {
    id: "pos-2",
    market: "BTC-PERP",
    size: 0.15,
    side: "short",
    entryPrice: 42500,
    markPrice: 41800,
    pnl: 105,
    pnlPercentage: 1.65,
    liquidationPrice: 48750,
  },
  {
    id: "pos-3",
    market: "ETH-PERP",
    size: 1.2,
    side: "long",
    entryPrice: 2250,
    markPrice: 2180,
    pnl: -84,
    pnlPercentage: -3.11,
    liquidationPrice: 1875,
  },
  {
    id: "pos-4",
    market: "AVAX-PERP",
    size: 25,
    side: "short",
    entryPrice: 28.75,
    markPrice: 29.25,
    pnl: -12.5,
    pnlPercentage: -1.74,
    liquidationPrice: 34.5,
  },
];

export const MOCK_ASSETS: Asset[] = [
  { type: "USDC", balance: 5000, icon: "💵" },
  { type: "SOL", balance: 120, icon: "⚡" },
  { type: "BTC", balance: 0.5, icon: "₿" },
];

export const MOCK_SUBACCOUNT: Subaccount = {
  id: "subaccount-1",
  name: "Main Trading",
  balance: 15420.65,
  assets: [
    { type: "USDC", balance: 10000, icon: "💵" },
    { type: "SOL", balance: 85.5, icon: "⚡" },
  ],
};

export const MOCK_SUBACCOUNTS: Subaccount[] = [
  {
    id: "subaccount-1",
    name: "Main Trading",
    balance: 15420.65,
    assets: [
      { type: "USDC", balance: 10000, icon: "💵" },
      { type: "SOL", balance: 85.5, icon: "⚡" },
    ],
  },
  {
    id: "subaccount-2",
    name: "Long-term Holdings",
    balance: 9143.24,
    assets: [
      { type: "USDC", balance: 2000, icon: "💵" },
      { type: "SOL", balance: 112.5, icon: "⚡" },
    ],
  },
];
