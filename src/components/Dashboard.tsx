"use client";

import { CardWithForm } from "./SubmitRepo";

export default function Dashboard() {
  return (
    <main className="flex justify-center w-screen">
      <div className="w-4/5 flex flex-col md:flex-row gap-5">
        <div className="flex w-full md:w-1/2">
          <CardWithForm></CardWithForm>
        </div>
        <div className="flex w-full md:w-1/2"></div>
      </div>
    </main>
  );
}
