import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Nav = () => {
  return (
    <div className="py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-tight ">
          FlavorSwift
        </Link>

        <div className="hidden md:block">
          <MainNav />
        </div>
        <div className="flex md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Nav;
