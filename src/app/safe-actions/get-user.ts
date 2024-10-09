"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  clerkUserID: z.string(),
});

export const getReposAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { clerkUserID } }) => {
    const self = await db.select().from(user).where(eq(user.name, clerkUserID));

    return self;
  });
