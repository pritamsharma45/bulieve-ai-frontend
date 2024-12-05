'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCurrentUser() {
  const { getUser } = getKindeServerSession();
  return getUser();
} 