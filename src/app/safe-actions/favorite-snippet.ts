"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { favorites } from "../db/schema";

// Input validation schema
const favoriteSnippetSchema = z.object({
  snippetId: z.string().uuid(),
});

// Return type
type FavoriteActionReturn = {
  favorited: boolean;
  error?: string;
};

// Create the safe action
export const favoriteSnippet = actionClient
  .schema(favoriteSnippetSchema)
  .action(
    async ({ parsedInput: { snippetId } }): Promise<FavoriteActionReturn> => {
      try {
        const { userId } = auth();

        if (!userId) {
          return {
            favorited: false,
            error: "You must be logged in to favorite snippets",
          };
        }

        // Check if the snippet is already favorited
        const existingFavorite = await db
          .select()
          .from(favorites)
          .where(
            and(
              eq(favorites.userId, userId),
              eq(favorites.snippetId, snippetId)
            )
          )
          .limit(1);

        // If it exists, remove the favorite (unfavorite)
        if (existingFavorite.length > 0) {
          console.log("removing favorite");
          await db
            .delete(favorites)
            .where(
              and(
                eq(favorites.userId, userId),
                eq(favorites.snippetId, snippetId)
              )
            );

          return {
            favorited: false,
          };
        }

        // If it doesn't exist, add the favorite
        await db.insert(favorites).values({
          userId,
          snippetId: snippetId,
        });

        return {
          favorited: true,
        };
      } catch (error) {
        console.error("Error in favoriteSnippet:", error);
        return {
          favorited: false,
          error: "Failed to update favorite status",
        };
      }
    }
  );

// Type for use in components
export type FavoriteSnippetAction = typeof favoriteSnippet;
