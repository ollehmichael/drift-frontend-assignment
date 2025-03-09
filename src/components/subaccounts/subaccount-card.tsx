"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Subaccount } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownToLine, ArrowUpFromLine, ExternalLink } from "lucide-react";

interface SubaccountCardProps {
  subaccount: Subaccount;
  onDeposit: () => void;
  onWithdraw: () => void;
  onSelect: () => void;
}

export function SubaccountCard({
  subaccount,
  onDeposit,
  onWithdraw,
  onSelect,
}: SubaccountCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-secondary pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <span>{subaccount.name}</span>
          <span className="text-sm font-normal text-muted-foreground">
            ID: {subaccount.id.slice(0, 8)}...
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="text-sm text-muted-foreground">Total Balance</div>
          <div className="text-2xl font-bold">
            {formatCurrency(subaccount.balance)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Assets</div>
          {subaccount.assets.map((asset) => (
            <div key={asset.type} className="flex justify-between text-sm">
              <span>
                {asset.balance.toFixed(2)} {asset.type}
              </span>
              {/* TODO: convert balance to USD value */}
              <span>{formatCurrency(asset.balance)}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 bg-card p-4 pt-0">
        <Button variant="outline" size="sm" onClick={onDeposit}>
          <ArrowDownToLine className="mr-1 h-4 w-4" />
          Deposit
        </Button>
        <Button variant="outline" size="sm" onClick={onWithdraw}>
          <ArrowUpFromLine className="mr-1 h-4 w-4" />
          Withdraw
        </Button>
        <Button variant="secondary" size="sm" onClick={onSelect}>
          <ExternalLink className="mr-1 h-4 w-4" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
