"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";

import { auth } from "@clerk/nextjs/server";

export const getUserReposAction = actionClient.action(async () => {
  const { userId } = auth();

  const data = await db
    .select({ repos: user.repos })
    .from(user)
    .where(eq(user.clerkUser, userId!));

  
  return data ;
});
