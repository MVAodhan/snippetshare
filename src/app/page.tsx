"use client";

import { useEffect, useState } from "react";
import { getReposAction } from "./safe-actions/get-repos";
import { customRepoSchema } from "./db/schema";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

type RepoSchema = z.infer<typeof customRepoSchema>;

export default function Home() {
  const [repos, setRepos] = useState<RepoSchema[] | null>();
  const getRepos = async () => {
    const repos = await getReposAction();

    setRepos(repos?.data);
  };
  useEffect(() => {
    getRepos();
  }, []);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-4/5 h-4/5 flex flex-col gap-5 overflow-scroll">
        {repos?.map((repo, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-xl">
                <a
                  href={`https://github.com/${repo.owner}/${repo.name}`}
                >{`github.com/${repo.owner}/${repo.name}`}</a>
              </CardTitle>
            </CardHeader>
            {/* <CardContent></CardContent> */}
            <CardFooter className="pl-4">
              <div className="flex flex-wrap ">
                {repo.dependencies?.map((dependency: string, i: number) => (
                  <div key={i} className="px-2 border rounded-full mb-1 ml-1">
                    {dependency}
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
