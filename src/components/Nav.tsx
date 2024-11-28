import React from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./theme-toggle";
const Nav = () => {
  return (
    <nav className="w-full h-[50px] flex sticky top-0 left-0 ">
      <div className="w-1/2 h-full flex items-center pl-5 ">
        <ModeToggle />
        <SidebarTrigger />
        <h1 className="text-2xl font-bold ml-5">SnippetShare</h1>
      </div>
      <div className="w-1/2 h-full flex items-center justify-end pr-5 gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Nav;
