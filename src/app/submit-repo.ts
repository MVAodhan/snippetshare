"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { getOctokitInstance } from "@/lib/utils";

const schema = z.object({
  repo: z.string().url().startsWith("https://github.com"),
});

export const getRepoDepsAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { repo } }) => {
    if (repo) {
      const segments = repo.split("/");

      const octokit = getOctokitInstance(process.env.GH_API_TOKEN!);

      const content = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: segments[3],
          repo: segments[4],
          path: "package.json",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const json = atob(content.data.content);

      //TODO: save in a DB
    }
  });
