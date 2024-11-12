import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

const BurgerCreate = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = window.localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="flex flex-row items-center z-50 mr-5">
      <div className="m-1 mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <RxHamburgerMenu className="text-3xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-auto z-50 bg-white shadow-lg"
            sideOffset={5}
            align="start"
          >
            <div className="p-2 flex flex-col">{children}</div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BurgerCreate;
