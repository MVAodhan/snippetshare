import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createRepo = mutation({
  args: {
    name: v.string(),
    dependencies: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    await ctx.db.insert("repo", {
      name: args.name,
      dependencies: args.dependencies,
      owner: identity?.nickname,
    });
  },
});

export const getRepos = query({
  handler: async (ctx) => {
    const repos = await ctx.db.query("repo").collect();
    return repos;
  },
});
