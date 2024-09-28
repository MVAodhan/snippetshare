import React from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const Nav = () => {
  return (
    <nav className="w-screen h-[50px] flex">
      <div className="w-1/2 h-full flex items-center pl-5">StackShare</div>
      <div className="w-1/2 h-full flex items-center justify-end pr-5">
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
