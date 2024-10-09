"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { repo } from "../db/schema";

export const getReposAction = actionClient.action(async () => {
  const repos = await db.select().from(repo);

  return repos;
});
