"use client";

import { OrdersTable } from "@/components/orders/orders-table";
import { PositionsTable } from "@/components/positions/positions-table";
import { AssetsList } from "@/components/subaccounts/assets-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_SUBACCOUNT } from "@/constants/MockData";
import { formatCurrency } from "@/lib/utils";
import { useAppContext } from "@/providers/app";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useEffect } from "react";

interface SubaccountDetailProps {
  id: string;
}

export function SubaccountDetail({ id }: SubaccountDetailProps) {
  const { setSelectedSubaccount } = useAppContext();

  useEffect(() => {
    setSelectedSubaccount(id);
    return () => setSelectedSubaccount(null);
  }, [id, setSelectedSubaccount]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {MOCK_SUBACCOUNT.name}
          </h1>
          <p className="text-muted-foreground">Subaccount ID: {id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Deposit
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
          <CardDescription>Your subaccount balance and assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="text-sm text-muted-foreground">Total Balance</div>
            <div className="text-3xl font-bold">
              {formatCurrency(MOCK_SUBACCOUNT.balance)}
            </div>
          </div>
          <AssetsList assets={MOCK_SUBACCOUNT.assets} />
        </CardContent>
      </Card>

      <Tabs defaultValue="positions">
        <TabsList>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="positions" className="mt-6">
          <PositionsTable />
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <OrdersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
