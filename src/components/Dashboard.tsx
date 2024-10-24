"use client";

import { useEffect, useState } from "react";
import { CardWithForm } from "./SubmitRepo";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getUserReposAction } from "@/app/safe-actions/get-user-repos";

export default function Dashboard() {
  const [repos, setRepos] = useState<string[] | null>(null);
  const getUser = async () => {
    const data = await getUserReposAction();

    setRepos(data?.data![0].repos);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <main className="flex justify-center w-screen">
      <div className="w-4/5 flex flex-col md:flex-row gap-5">
        <div className="flex w-full md:w-1/2">
          <CardWithForm></CardWithForm>
        </div>
        <div className="flex w-full md:w-1/2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Your Repo&apos;s</CardTitle>
              <CardDescription>
                The repo&apos;s you&apos;ve shared
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <ul>
                    {repos?.map((repo, i) => (
                      <li key={i}>{repo}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
