"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { SubaccountsList } from "@/components/subaccounts/subaccounts-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { useAppContext } from "@/providers/app";
import { useEffect, useState } from "react";

export function DashboardContent() {
  const { connected } = useAppContext();
  const [driftUser, setDriftUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDriftData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/drift");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch Drift data");
        }

        setDriftUser(data.data);
        console.log("ATTENTION", data);
      } catch (error) {
        console.error("Error fetching Drift data:", error);
        setError("Failed to fetch Drift data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (connected) {
      fetchDriftData();
    }
  }, [connected]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Drift Protocol account and trading activity.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {loading && (
        <div className="rounded-md bg-muted p-4">
          <p className="text-sm text-muted-foreground">Loading Drift data...</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Balance"
          value={formatCurrency(24563.89)}
          description="Across all subaccounts"
          trend={+5.25}
        />
        <StatsCard
          title="Open Positions"
          value="12"
          description="Across all markets"
        />
        <StatsCard
          title="24h PnL"
          value={formatCurrency(1245.32)}
          description="Realized + Unrealized"
          trend={+2.8}
          trendType="positive"
        />
        <StatsCard
          title="Open Orders"
          value="8"
          description="Limit and stop orders"
        />
      </div>

      <Tabs defaultValue="subaccounts">
        <TabsList>
          <TabsTrigger value="subaccounts">Subaccounts</TabsTrigger>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="subaccounts" className="mt-6">
          <SubaccountsList />
        </TabsContent>
        <TabsContent value="recent-activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest transactions and trading activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                {!connected ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Connect your wallet to view recent activity
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No recent activity found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
