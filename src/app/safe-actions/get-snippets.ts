"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { snippets } from "../db/schema";

export const getSnippetsAction = actionClient.action(async () => {
  const codeSnippets = await db.select().from(snippets);

  return codeSnippets;
});
