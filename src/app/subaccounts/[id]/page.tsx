import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SubaccountDetail } from "@/components/subaccounts/subaccount-detail"

export default function SubaccountDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <SubaccountDetail id={params.id} />
    </DashboardLayout>
  )
}

