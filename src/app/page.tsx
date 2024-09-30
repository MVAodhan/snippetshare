"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const repos = useQuery(api.repos.getRepos);

  return (
    <main className="w-screen h-screen flex justify-center">
      <ul>{repos?.map((repo, i) => <li key={i}> {repo.name} </li>)}</ul>
    </main>
  );
}
