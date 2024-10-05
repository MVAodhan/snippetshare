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
import { getRepoDepsAction } from "@/app/safe-actions/submit-repo";

import {
  areStackDependenciesInDependencies,
  filterOutTechnologyDependencies,
} from "@/lib/utils";
// import { useUser } from "@clerk/nextjs";

export function CardWithForm() {
  const repoRef = useRef<HTMLInputElement | null>(null);

  // const { user: clerkUser } = useUser();

  const submitRepo = async () => {
    const repo = repoRef.current?.value as string;
    const res = await getRepoDepsAction({
      repo,
    });
    if (res?.data?.payload) {
      const json = JSON.parse(res?.data?.payload);
      const deps = Object.keys(json.dependencies);

      let namespaceDependencies = [] as Array<string>;
      let nonNamespaceDependencies = [] as Array<string>;

      for (const dependency of deps) {
        if (dependency.startsWith("@")) {
          const paths = dependency.split("/");
          namespaceDependencies = [
            ...namespaceDependencies,
            paths[0].split("@")[1],
          ];
        } else {
          nonNamespaceDependencies = [...nonNamespaceDependencies, dependency];
        }
      }

      let noTypesDependecies: Array<string> = [];
      for (const dependency of namespaceDependencies) {
        if (dependency !== "types") {
          noTypesDependecies = [...noTypesDependecies, dependency];
        }
      }

      const allDependencies = [
        ...nonNamespaceDependencies,
        ...noTypesDependecies,
      ];

      const technology = {
        name: "tailwind",
        dependencies: ["tailwindcss", "postcss", "autoprefixer"],
      };

      let finalDependencies: Array<string> = [];
      const stackDependencyInDependencies = areStackDependenciesInDependencies(
        allDependencies,
        technology.dependencies
      );

      if (stackDependencyInDependencies.every((dep) => dep === true)) {
        finalDependencies = filterOutTechnologyDependencies(
          allDependencies,
          technology.dependencies
        );
        finalDependencies.push(technology.name);
      }

      /// Todo : Insert finalDependencies into db
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
