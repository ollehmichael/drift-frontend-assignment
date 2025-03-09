export const enum MarketNameEnum {
  SOL_PERP = "SOL-PERP",
  BTC_PERP = "BTC-PERP",
  ETH_PERP = "ETH-PERP",
  AVAX_PERP = "AVAX-PERP",
}

export const enum TransactionTypeEnum {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export const enum OrderTypeEnum {
  LIMIT = "limit",
  MARKET = "market",
  STOP = "stop",
}

export const enum OrderSideEnum {
  BUY = "buy",
  SELL = "sell",
}

export const enum OrderStatusEnum {
  OPEN = "open",
  PARTIALLY_FILLED = "partially_filled",
  FILLED = "filled",
  CANCELED = "canceled",
}

export const enum OrderSortFieldEnum {
  MARKET = "market",
  TYPE = "type",
  SIDE = "side",
  SIZE = "size",
  PRICE = "price",
  STATUS = "status",
  TIMESTAMP = "timestamp",
}

export const enum PositionSideEnum {
  LONG = "long",
  SHORT = "short",
}

// NOTE: camelcase since value represents the field name
export const enum PositionSortFieldEnum {
  MARKET = "market",
  SIZE = "size",
  ENTRY_PRICE = "entryPrice",
  MARK_PRICE = "markPrice",
  PNL = "pnl",
  LIQUIDATION_PRICE = "liquidationPrice",
}

export const enum AssetTypeEnum {
  USDC = "USDC",
  SOL = "SOL",
  BTC = "BTC",
  ETH = "ETH",
  AVAX = "AVAX",
}

export const enum SortDirectionEnum {
  ASC = "asc",
  DESC = "desc",
}
