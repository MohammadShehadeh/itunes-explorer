import type { PropsWithChildren } from "react";

type IfProps = PropsWithChildren<{
  condition: boolean;
}>;

/**
 * Conditionally renders children only if the condition is true.
 *
 * Example:
 * ```tsx
 * <If condition={isLoggedIn}>
 *   <Dashboard />
 * </If>
 * ```
 */
export const If = ({ condition, children }: IfProps) => {
  return condition ? children : null;
};
