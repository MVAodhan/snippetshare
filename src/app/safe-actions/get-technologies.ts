"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { technology } from "../db/schema";

export const getTechnologiesAction = actionClient.action(async () => {
  const repos = await db.select().from(technology);

  return repos;
});
