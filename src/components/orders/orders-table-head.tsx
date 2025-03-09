"use client";

import { TableHead } from "@/components/ui/table";
import { OrderSortFieldEnum, SortDirectionEnum } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OrdersTableHeadProps {
  field: `${OrderSortFieldEnum}`;
  sortField: `${OrderSortFieldEnum}`;
  sortDirection: `${SortDirectionEnum}`;
  handleSort: (field: `${OrderSortFieldEnum}`) => void;
  textRight?: boolean;
}

export function OrdersTableHead({
  field,
  sortField,
  sortDirection,
  handleSort,
  textRight = false,
}: OrdersTableHeadProps) {
  let label;

  switch (field) {
    case OrderSortFieldEnum.MARKET:
      label = "Market";
      break;
    case OrderSortFieldEnum.TYPE:
      label = "Type";
      break;
    case OrderSortFieldEnum.SIDE:
      label = "Side";
      break;
    case OrderSortFieldEnum.SIZE:
      label = "Size";
      break;
    case OrderSortFieldEnum.PRICE:
      label = "Price";
      break;
    case OrderSortFieldEnum.STATUS:
      label = "Status";
      break;
    case OrderSortFieldEnum.TIMESTAMP:
      label = "Time";
      break;
    default:
      label = field.charAt(0).toUpperCase() + field.slice(1);
  }

  return (
    <TableHead
      className={cn("cursor-pointer", textRight && "text-right")}
      onClick={() => handleSort(field)}
    >
      {label}
      {sortField === field && (
        <span className="ml-1">
          {sortDirection === SortDirectionEnum.ASC ? (
            <ChevronUp className="inline h-4 w-4" />
          ) : (
            <ChevronDown className="inline h-4 w-4" />
          )}
        </span>
      )}
    </TableHead>
  );
}
