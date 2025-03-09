"use client";

import { CreateOrderForm } from "@/components/orders/create-order-form";
import { OrdersTable } from "@/components/orders/orders-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/providers/app";
import { useEffect } from "react";

interface OrdersViewProps {
  subaccountId: string;
}

export function OrdersView({ subaccountId }: OrdersViewProps) {
  const { setSelectedSubaccount } = useAppContext();

  useEffect(() => {
    setSelectedSubaccount(subaccountId);
    return () => setSelectedSubaccount(null);
  }, [subaccountId, setSelectedSubaccount]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage your open orders and create new orders.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrdersTable />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create Order</CardTitle>
              <CardDescription>Place a new order on the market</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
