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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_ASSETS } from "@/constants/MockData";
import { AssetTypeEnum, TransactionTypeEnum } from "@/lib/enums";
import { ArrowDownToLine, ArrowUpFromLine, Loader2 } from "lucide-react";
import { useState } from "react";

interface DepositWithdrawModalProps {
  type: `${TransactionTypeEnum}`;
  // subaccountId: string;
  subaccountName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DepositWithdrawModal({
  type,
  // subaccountId,
  subaccountName,
  open,
  onOpenChange,
}: DepositWithdrawModalProps) {
  const [asset, setAsset] = useState<`${AssetTypeEnum}`>(AssetTypeEnum.USDC);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedAsset = MOCK_ASSETS.find((a) => a.type === asset);
  const maxAmount = selectedAsset?.balance || 0;
  const networkFee = 0.001; // Mock network fee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate transaction
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      setAmount("");
    }, 2000);
  };

  const handleSetMax = () => {
    if (type === TransactionTypeEnum.WITHDRAW) {
      setAmount(maxAmount.toString());
    } else {
      setAmount(selectedAsset?.balance.toString() || "0");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === TransactionTypeEnum.DEPOSIT ? (
              <div className="flex items-center">
                <ArrowDownToLine className="mr-2 h-5 w-5 text-success" />
                Deposit to Subaccount
              </div>
            ) : (
              <div className="flex items-center">
                <ArrowUpFromLine className="mr-2 h-5 w-5 text-destructive" />
                Withdraw from Subaccount
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === TransactionTypeEnum.DEPOSIT
              ? `Deposit assets to your "${subaccountName}" subaccount.`
              : `Withdraw assets from your "${subaccountName}" subaccount.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="asset">Select Asset</Label>
              <Select
                value={asset}
                onValueChange={(value) => setAsset(value as `${AssetTypeEnum}`)}
              >
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_ASSETS.map((asset) => (
                    <SelectItem key={asset.type} value={asset.type}>
                      <div className="flex items-center">
                        <span className="mr-2">{asset.icon}</span>
                        {asset.type}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Amount</Label>
                {selectedAsset && (
                  <div className="text-xs text-muted-foreground">
                    Available: {selectedAsset.balance} {selectedAsset.type}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="any"
                  min="0"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSetMax}
                >
                  Max
                </Button>
              </div>
            </div>
            <div className="rounded-md bg-muted p-3">
              <div className="flex justify-between text-sm">
                <span>Network Fee</span>
                <span>
                  ~{networkFee} {asset}
                </span>
              </div>
              {amount && (
                <div className="mt-2 flex justify-between text-sm font-medium">
                  <span>
                    You will{" "}
                    {type === TransactionTypeEnum.DEPOSIT
                      ? "deposit"
                      : "withdraw"}
                  </span>
                  <span>
                    {type === TransactionTypeEnum.WITHDRAW
                      ? Number.parseFloat(amount) - networkFee
                      : Number.parseFloat(amount)}{" "}
                    {asset}
                  </span>
                </div>
              )}
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
            <Button
              type="submit"
              disabled={loading || !amount || Number.parseFloat(amount) <= 0}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {type === TransactionTypeEnum.DEPOSIT ? "Deposit" : "Withdraw"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
