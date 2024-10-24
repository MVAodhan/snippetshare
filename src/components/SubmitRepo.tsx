"use client";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRepoDepsAction } from "@/app/safe-actions/get-dependencies";

import { saveRepoAction } from "@/app/safe-actions/save-repo";
import { useUser } from "@clerk/nextjs";
import { getTechnologiesAction } from "@/app/safe-actions/get-technologies";
import {
  areStackDependenciesInDependencies,
  filterOutTechnologyDependencies,
} from "@/lib/utils";

export function CardWithForm() {
  const repoRef = useRef<HTMLInputElement | null>(null);

  const { user: clerkUser } = useUser();

  const submitRepo = async () => {
    const repo = repoRef.current?.value as string;
    const segments = repo.split("/");
    const repoOwner = segments[3];
    const repoName = segments[4];
    const res = await getRepoDepsAction({
      repo,
    });

    let finalDeps;
    if (res?.data?.payload) {
      const json = JSON.parse(res?.data?.payload);
      const deps = Object.keys(json.dependencies);

      const technologies = await getTechnologiesAction();

      if (technologies?.data) {
        for (const technology of technologies.data) {
          const arr = areStackDependenciesInDependencies(
            deps,
            technology.dependencies!
          );
          if (arr.every((dep) => dep === true)) {
            finalDeps = filterOutTechnologyDependencies(
              deps,
              technology.dependencies!
            );
            finalDeps.push(technology.name!);
          }
        }
      }

      console.log(finalDeps);

      await saveRepoAction({
        userId: clerkUser?.id as string,
        name: repoName,
        dependencies: finalDeps ? finalDeps : deps,
        owner: repoOwner,
      });

      // repoRef.current!.value = "";
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit a Repo</CardTitle>
        <CardDescription>
          Submit your repo, to share your stack your way{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="repo">Repo</Label>
            <Input
              id="repo"
              type="text"
              placeholder="e.g https://github.com/<username>/<repo> "
              ref={repoRef}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={submitRepo}>Submit Repo</Button>
      </CardFooter>
    </Card>
  );
}
