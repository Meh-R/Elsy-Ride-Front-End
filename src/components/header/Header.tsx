import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <div className="bg-zinc-300 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-0">
          <div className="flex flex-row justify-between items-center">
            <Link href="/myHomePage">
              <Image
                src="/Elsy_Bike_transparent.png"
                alt="Elsy Ride Logo"
                width={400}
                height={71}
                priority
              />
            </Link>
            <div className="flex justify-end items-center w-full">
              {children}
            </div>
            <div className="flex flex-row items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>
                    <FaRegUserCircle className="text-3xl mr-5" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto bg-white flex flex-col items-center">
                  <button
                    onClick={() => {
                      window.localStorage.removeItem("token");
                      window.localStorage.removeItem("role");
                      window.alert("Logged out successfully");
                      window.location.href = "/";
                    }}
                    className="text-black m-1 mx-5"
                  >
                    Log out
                  </button>
                  <Link className="mr-5 mb-1" href="/myOrder">
                    My order
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <Cart />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
