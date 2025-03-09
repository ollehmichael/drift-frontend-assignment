"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_ORDERS } from "@/constants/MockData";
import {
  OrderSideEnum,
  OrderSortFieldEnum,
  SortDirectionEnum,
} from "@/lib/enums";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";
import { OrdersTableHead } from "./orders-table-head";

export function OrdersTable() {
  const [sortField, setSortField] = useState<`${OrderSortFieldEnum}`>(
    OrderSortFieldEnum.TIMESTAMP
  );
  const [sortDirection, setSortDirection] = useState<`${SortDirectionEnum}`>(
    SortDirectionEnum.DESC
  );

  const handleSort = (field: `${OrderSortFieldEnum}`) => {
    if (field === sortField) {
      setSortDirection(
        sortDirection === SortDirectionEnum.ASC
          ? SortDirectionEnum.DESC
          : SortDirectionEnum.ASC
      );
    } else {
      setSortField(field);
      setSortDirection(SortDirectionEnum.ASC);
    }
  };

  const sortedOrders = [...MOCK_ORDERS].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle null values for price (market orders)
    if (sortField === OrderSortFieldEnum.PRICE) {
      aValue = aValue === null ? 0 : aValue;
      bValue = bValue === null ? 0 : bValue;
    }

    if (aValue < bValue) {
      return sortDirection === SortDirectionEnum.ASC ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === SortDirectionEnum.ASC ? 1 : -1;
    }
    return 0;
  });

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <OrdersTableHead
                field={OrderSortFieldEnum.MARKET}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <OrdersTableHead
                field={OrderSortFieldEnum.TYPE}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <OrdersTableHead
                field={OrderSortFieldEnum.SIDE}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <OrdersTableHead
                field={OrderSortFieldEnum.SIZE}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
                textRight
              />
              <OrdersTableHead
                field={OrderSortFieldEnum.PRICE}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
                textRight
              />
              <OrdersTableHead
                field={OrderSortFieldEnum.STATUS}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <OrdersTableHead
                field={OrderSortFieldEnum.TIMESTAMP}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.market}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {order.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      order.side === OrderSideEnum.BUY
                        ? OrderSideEnum.BUY
                        : OrderSideEnum.SELL
                    }
                  >
                    {order.side}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(order.size)}
                  {order.filled > 0 && order.filled < order.size && (
                    <div className="text-xs text-muted-foreground">
                      {formatNumber(order.filled)} filled
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {order.price ? formatCurrency(order.price) : "Market"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      order.status === "filled"
                        ? "bg-success/20 text-success"
                        : order.status === "partially_filled"
                        ? "bg-amber-500/20 text-amber-500"
                        : ""
                    }`}
                  >
                    {order.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{formatTimestamp(order.timestamp)}</TableCell>
                <TableCell className="text-right">
                  {order.status !== "filled" && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Cancel</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {MOCK_ORDERS.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
