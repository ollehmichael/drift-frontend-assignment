"use client";

import { SubaccountsList } from "@/components/subaccounts/subaccounts-list";

export function SubaccountsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Subaccounts</h1>
        <p className="text-muted-foreground">
          Manage your subaccounts to organize your trading activities.
        </p>
      </div>
      <SubaccountsList />
    </div>
  );
}
