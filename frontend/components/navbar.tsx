import React from "react";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";

const navbar = () => {
  return (
    <header className="w-full sticky top-0 z-50 p-5 sm:p-10">
      <div className="w-full flex justify-center">
        <nav className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between p-3 border-2 border-neutral-900 bg-neutral-900/30 rounded-xl ">
          {/* logo */}
          <h1 className="text-3xl tracking-wide mb-5 sm:mb-0 font-medium text-neutral-50">
            Kira
            <span className="text-base tracking-tighter font-normal text-rose-700">
              inv
            </span>
          </h1>
          {/* options -> dashboar, user */}
          <div className="flex gap-4 sm:gap-3">
            <Button>Dashboard</Button>
            <Button variant="special">
              <UserCircle className="w-10 h-10 shrink-0" /> Account
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default navbar;
