"use client";

import { CreateSubaccountDialog } from "@/components/subaccounts/create-subaccount-dialog";
import { DepositWithdrawModal } from "@/components/subaccounts/deposit-withdraw-modal";
import { SubaccountCard } from "@/components/subaccounts/subaccount-card";
import { Button } from "@/components/ui/button";
import { MOCK_SUBACCOUNTS } from "@/constants/MockData";
import { TransactionTypeEnum } from "@/lib/enums";
import { useAppContext } from "@/providers/app";
import { Plus } from "lucide-react";
import { useState } from "react";

type ModalData = {
  subaccountId: string;
  subaccountName: string;
};

export function SubaccountsList() {
  const { setSelectedSubaccount } = useAppContext();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [modalType, setModalType] = useState<`${TransactionTypeEnum}` | null>(
    null
  );
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const handleAction = (
    type: `${TransactionTypeEnum}` | null,
    subaccountId: string,
    subaccountName: string
  ) => {
    setModalType(type);
    setModalData({ subaccountId, subaccountName });
  };

  const handleSelectSubaccount = (subaccountId: string) => {
    setSelectedSubaccount(subaccountId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Subaccounts</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Subaccount
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_SUBACCOUNTS.map((subaccount) => (
          <SubaccountCard
            key={subaccount.id}
            subaccount={subaccount}
            onDeposit={() =>
              handleAction(
                TransactionTypeEnum.DEPOSIT,
                subaccount.id,
                subaccount.name
              )
            }
            onWithdraw={() =>
              handleAction(
                TransactionTypeEnum.WITHDRAW,
                subaccount.id,
                subaccount.name
              )
            }
            onSelect={() => handleSelectSubaccount(subaccount.id)}
          />
        ))}
      </div>

      <CreateSubaccountDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {modalType && modalData && (
        <DepositWithdrawModal
          type={modalType}
          // subaccountId={modalData.subaccountId}
          subaccountName={modalData.subaccountName}
          open={!!modalType}
          onOpenChange={() => setModalType(null)}
        />
      )}
    </div>
  );
}
