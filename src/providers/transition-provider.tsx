"use client";

import { useSearchParams } from "next/navigation";
import { createContext, type ReactNode, useContext, useOptimistic, useTransition } from "react";

type TransitionContextType = {
  isPending: boolean;
  startAppTransition: (callback: () => void) => void;
  optimisticQuery: string;
  addOptimisticQuery: (query: string) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [optimisticQuery, addOptimisticQuery] = useOptimistic<string, string>(
    searchParams.get("query") ?? "",
    (_, newQuery) => newQuery,
  );

  const startAppTransition = (callback: () => void) => {
    startTransition(() => {
      callback();
    });
  };

  return (
    <TransitionContext.Provider
      value={{
        isPending,
        optimisticQuery,
        addOptimisticQuery,
        startAppTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useAppTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useAppTransition must be used within TransitionProvider");
  }
  return context;
}
