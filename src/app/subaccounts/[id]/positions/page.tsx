import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PositionsView } from "@/components/positions/positions-view";

export default async function PositionsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <PositionsView subaccountId={(await params).id || ""} />
    </DashboardLayout>
  );
}
