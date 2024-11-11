"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { db } from "../db";

import { snippets } from "../db/schema";

const snippetSchema = z.object({
  code: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  authorId: z.string(),
});

export const saveSnippetAction = actionClient
  .schema(snippetSchema)
  .action(
    async ({ parsedInput: { title, code, description, tags, authorId } }) => {
      const returnedRepo = await db
        .insert(snippets)
        .values({
          code: code,
          title: title,
          description: description,
          tags: tags,
          authorId: authorId,
        })
        .returning();

      return { returnedRepo };
    }
  );
