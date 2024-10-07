"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { repo } from "../db/schema";

const saveRepoSchema = z.object({
  userId: z.string(),
  name: z.string(),
  dependencies: z.array(z.string()),
  owner: z.string(),
});

export const saveRepoAction = actionClient
  .schema(saveRepoSchema)
  .action(async ({ parsedInput: { userId, name, dependencies, owner } }) => {
    const newDate = new Date();
    const returnedRepo = await db
      .insert(repo)
      .values({
        userId: userId,
        name: name,
        dependencies: dependencies,
        owner: owner,
        date: newDate,
      })
      .returning({ insertedRepo: repo.name });

    return { returnedRepo };
  });
