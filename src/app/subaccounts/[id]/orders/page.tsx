import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { OrdersView } from "@/components/orders/orders-view";

export default async function OrdersPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <OrdersView subaccountId={(await params).id || ""} />
    </DashboardLayout>
  );
}
