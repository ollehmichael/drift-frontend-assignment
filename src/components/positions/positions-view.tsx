"use client";

import { PositionsTable } from "@/components/positions/positions-table";
import { useAppContext } from "@/providers/app";
import { useEffect } from "react";

interface PositionsViewProps {
  subaccountId: string;
}

export function PositionsView({ subaccountId }: PositionsViewProps) {
  const { setSelectedSubaccount } = useAppContext();

  useEffect(() => {
    setSelectedSubaccount(subaccountId);
    return () => setSelectedSubaccount(null);
  }, [subaccountId, setSelectedSubaccount]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Positions</h1>
        <p className="text-muted-foreground">
          Manage your open positions across all markets.
        </p>
      </div>
      <PositionsTable />
    </div>
  );
}
