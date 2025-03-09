"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";

interface AdjustPositionModalProps {
  position: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdjustPositionModal({
  position,
  open,
  onOpenChange,
}: AdjustPositionModalProps) {
  const [size, setSize] = useState(Math.abs(position.size));
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
    }, 1500);
  };

  const handleSizeChange = (value: number[]) => {
    setSize(value[0]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center">
              Adjust {position.market} Position
              {position.side === "long" ? (
                <span className="ml-2 text-success">
                  <ArrowUp className="inline h-4 w-4" /> Long
                </span>
              ) : (
                <span className="ml-2 text-destructive">
                  <ArrowDown className="inline h-4 w-4" /> Short
                </span>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Adjust your position size or add take profit/stop loss orders.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="size">Position Size</Label>
                <div className="text-sm">
                  Current: {formatNumber(Math.abs(position.size))}
                </div>
              </div>
              <Input
                id="size"
                type="number"
                value={size}
                onChange={(e) => setSize(Number.parseFloat(e.target.value))}
                step="any"
                min="0"
              />
              <Slider
                defaultValue={[Math.abs(position.size)]}
                max={Math.abs(position.size) * 2}
                step={0.01}
                value={[size]}
                onValueChange={handleSizeChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{formatNumber(Math.abs(position.size) * 2)}</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Position Details</Label>
              <div className="rounded-md bg-muted p-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Entry Price</div>
                  <div className="text-right">
                    {formatCurrency(position.entryPrice)}
                  </div>
                  <div>Mark Price</div>
                  <div className="text-right">
                    {formatCurrency(position.markPrice)}
                  </div>
                  <div>Liquidation Price</div>
                  <div className="text-right">
                    {formatCurrency(position.liquidationPrice)}
                  </div>
                  <div>PnL</div>
                  <div
                    className={`text-right ${
                      position.pnl > 0
                        ? "text-success"
                        : position.pnl < 0
                        ? "text-destructive"
                        : ""
                    }`}
                  >
                    {formatCurrency(position.pnl)} (
                    {position.pnlPercentage > 0 ? "+" : ""}
                    {position.pnlPercentage.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Position
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
