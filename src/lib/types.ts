import {
  AssetTypeEnum,
  MarketNameEnum,
  OrderSideEnum,
  OrderStatusEnum,
  OrderTypeEnum,
  PositionSideEnum,
} from "@/lib/enums";

export type Market = {
  id: string;
  name: `${MarketNameEnum}`;
  price: number;
};

export type Order = {
  id: string;
  market: `${MarketNameEnum}`;
  type: `${OrderTypeEnum}`;
  side: `${OrderSideEnum}`;
  size: number;
  price: number;
  status: `${OrderStatusEnum}`;
  filled: number;
  timestamp: number;
};

export type Position = {
  id: string;
  market: `${MarketNameEnum}`;
  size: number;
  side: `${PositionSideEnum}`;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  pnlPercentage: number;
  liquidationPrice: number;
};

export type Asset = {
  type: `${AssetTypeEnum}`;
  balance: number;
  icon: string;
};

export type Subaccount = {
  id: string;
  name: string;
  balance: number;
  assets: Asset[];
};
