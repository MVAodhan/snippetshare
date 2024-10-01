import React from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
const Nav = () => {
  return (
    <nav className="w-screen h-[50px] flex sticky top-0 left-0">
      <div className="w-1/2 h-full flex items-center pl-5">StackShare</div>
      <div className="w-1/2 h-full flex items-center justify-end pr-5 gap-5">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
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
