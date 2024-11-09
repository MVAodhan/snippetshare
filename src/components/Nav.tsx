import React from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
const Nav = () => {
  return (
    <nav className="w-full h-[50px] flex sticky top-0 left-0 border border-red-500">
      <div className="w-1/2 h-full flex items-center pl-5" >StackShare</div>
      <div className="w-1/2 h-full flex items-center justify-end pr-5 gap-5">
        <Link href="/">Home</Link>
        <SidebarTrigger />
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
