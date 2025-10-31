"use client";

import { DirectionProvider } from "@radix-ui/react-direction";
import type { PropsWithChildren } from "react";

export const Direction = ({ children }: PropsWithChildren) => {
  return <DirectionProvider dir="rtl">{children}</DirectionProvider>;
};
