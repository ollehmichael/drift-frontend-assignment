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

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Drift Protocol account and trading activity.
        </p>
      </div>

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
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Connect your wallet to view recent activity
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
