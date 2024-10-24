"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { repo, user } from "../db/schema";
import { eq } from "drizzle-orm";

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

    const userRepos = await db.select({ repos: user.repos }).from(user);

    await db.update(user).set({repos: [...(userRepos[0].repos as string[]), name]}).where(eq(user.clerkUser, userId))

    return { returnedRepo };
  });
