"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRepos } from "../../zustand/store";

export default function Home() {
  // const repos = useQuery(api.repos.getRepos);

  return <main className="w-screen h-screen flex justify-center"></main>;
}
