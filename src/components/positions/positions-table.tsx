"use client";

import { AdjustPositionModal } from "@/components/positions/adjust-position-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_POSITIONS } from "@/constants/MockData";
import { PositionSortFieldEnum, SortDirectionEnum } from "@/lib/enums";
import { Position } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { PositionsSideBadge } from "./positions-side-badge";
import { PositionsTableHead } from "./positions-table-head";

export function PositionsTable() {
  const [sortField, setSortField] = useState<`${PositionSortFieldEnum}`>(
    PositionSortFieldEnum.MARKET
  );
  const [sortDirection, setSortDirection] = useState<`${SortDirectionEnum}`>(
    SortDirectionEnum.ASC
  );
  const [adjustModalOpen, setAdjustModalOpen] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  const handleSort = (field: `${PositionSortFieldEnum}`) => {
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

  const sortedPositions = [...MOCK_POSITIONS].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === PositionSortFieldEnum.SIZE) {
      aValue = Math.abs(a.size);
      bValue = Math.abs(b.size);
    }

    if (aValue < bValue) {
      return sortDirection === SortDirectionEnum.ASC ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === SortDirectionEnum.ASC ? 1 : -1;
    }
    return 0;
  });

  const handleAdjustPosition = (position: Position) => {
    setSelectedPosition(position);
    setAdjustModalOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <PositionsTableHead
                  field={PositionSortFieldEnum.MARKET}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                />
                <PositionsTableHead
                  field={PositionSortFieldEnum.SIZE}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  textRight
                />
                <PositionsTableHead
                  field={PositionSortFieldEnum.ENTRY_PRICE}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  textRight
                />
                <PositionsTableHead
                  field={PositionSortFieldEnum.MARK_PRICE}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  textRight
                />
                <PositionsTableHead
                  field={PositionSortFieldEnum.PNL}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  textRight
                />
                <PositionsTableHead
                  field={PositionSortFieldEnum.LIQUIDATION_PRICE}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  textRight
                />
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPositions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell>
                    <div className="font-medium">{position.market}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <PositionsSideBadge side={position.side} />
                      {formatNumber(Math.abs(position.size))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(position.entryPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(position.markPrice)}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      position.pnl > 0
                        ? "positive"
                        : position.pnl < 0
                        ? "negative"
                        : ""
                    }`}
                  >
                    <div>{formatCurrency(position.pnl)}</div>
                    <div className="text-xs">
                      {position.pnlPercentage > 0 ? "+" : ""}
                      {position.pnlPercentage.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(position.liquidationPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAdjustPosition(position)}
                      >
                        Adjust
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <X className="mr-2 h-4 w-4" />
                            Close Position
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Add Take Profit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Add Stop Loss
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {MOCK_POSITIONS.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No positions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedPosition && (
        <AdjustPositionModal
          position={selectedPosition}
          open={adjustModalOpen}
          onOpenChange={setAdjustModalOpen}
        />
      )}
    </>
  );
}
