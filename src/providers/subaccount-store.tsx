"use client";

import { createSubaccountStore, SubaccountStore } from "@/lib/store/subaccount";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type SubaccountStoreApi = ReturnType<typeof createSubaccountStore>;

export const SubaccountStoreContext = createContext<
  SubaccountStoreApi | undefined
>(undefined);

export interface SubaccountStoreProviderProps {
  children: ReactNode;
}

export const SubaccountStoreProvider = ({
  children,
}: SubaccountStoreProviderProps) => {
  const storeRef = useRef<SubaccountStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createSubaccountStore();
  }

  return (
    <SubaccountStoreContext.Provider value={storeRef.current}>
      {children}
    </SubaccountStoreContext.Provider>
  );
};

export const useSubaccountStore = <T,>(
  selector: (store: SubaccountStore) => T
): T => {
  const subaccountStoreContext = useContext(SubaccountStoreContext);

  if (!subaccountStoreContext) {
    throw new Error(
      "useSubaccountStore must be used within SubaccountStoreProvider"
    );
  }

  return useStore(subaccountStoreContext, selector);
};
