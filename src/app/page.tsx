// "use client";

import { db } from "./db";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

export default async function Home() {

  
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-4/5 h-4/5 flex flex-col gap-5 overflow-scroll">
        {/* {repos?.map((repo, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-xl">{`${repo.owner}/${repo.name}`}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter className="pl-4">
              <div className="flex flex-wrap ">
                {repo.dependencies?.map((dependency, i) => (
                  <div key={i} className="px-2 border rounded-full mb-1 ml-1">
                    {dependency}
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))} */}
      </div>
    </main>
  );
}
