"use client";

import { TableHead } from "@/components/ui/table";
import { PositionSortFieldEnum, SortDirectionEnum } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PositionsTableHeadProps {
  field: `${PositionSortFieldEnum}`;
  sortField: `${PositionSortFieldEnum}`;
  sortDirection: `${SortDirectionEnum}`;
  handleSort: (field: `${PositionSortFieldEnum}`) => void;
  textRight?: boolean;
}

export function PositionsTableHead({
  field,
  sortField,
  sortDirection,
  handleSort,
  textRight = false,
}: PositionsTableHeadProps) {
  let label;

  switch (field) {
    case PositionSortFieldEnum.MARKET:
      label = "Market";
      break;
    case PositionSortFieldEnum.SIZE:
      label = "Size";
      break;
    case PositionSortFieldEnum.ENTRY_PRICE:
      label = "Entry Price";
      break;
    case PositionSortFieldEnum.MARK_PRICE:
      label = "Mark Price";
      break;
    case PositionSortFieldEnum.PNL:
      label = "PnL";
      break;
    case PositionSortFieldEnum.LIQUIDATION_PRICE:
      label = "Liquidation";
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
