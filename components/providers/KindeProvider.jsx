"use client";

import { KindeProvider as Provider } from "@kinde-oss/kinde-auth-nextjs";

export function KindeProvider({ children }) {
  return <Provider>{children}</Provider>;
} 