"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import ButtonCreateCategory from "@/components/header/ButtonCreateCategory";
import ButtonUpdateCategory from "@/components/list/buttonUpdateCategory";
import { allCategory, deleteCategory } from "@/services/category";
import { Category } from "@/utils/types";
import { Context2 } from "@/context/context2";
import toast from "react-hot-toast";
import { ImBin } from "react-icons/im";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";

const AdminCategoriesPage = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isReloadNeeded, setIsReloadNeeded] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const fetchCategories = async () => {
    const response = await allCategory();
    setCategoryList(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, [isReloadNeeded]);

  useEffect(() => {
    setIsClient(true);
    setIsAdmin(localStorage.getItem("role") === "admin");
  }, []);

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully");
      setIsReloadNeeded((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  return (
    <Context2.Provider value={{ isReloadNeeded, setIsReloadNeeded }}>
      <div className="bg-slate-100 min-h-screen">
        <Header>
          <div className="md:hidden flex items-center mr-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <RxHamburgerMenu className="text-3xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-auto bg-white shadow-lg z-50"
                sideOffset={5}
                align="start"
              >
                <div className="p-2 flex flex-col">
                  <Link href={`/myHomePage`} className="mb-2">
                    Home
                  </Link>
                  {isClient && isAdmin && (
                    <>
                      <Link href={`/productPageAdmin`} className="mb-2">
                        Product Management
                      </Link>
                      <Link href={`/order`} className="mb-2">
                        Order
                      </Link>
                      <Link className="mr-5 mb-1" href={`/User`}>
                        User
                      </Link>
                    </>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex space-x-5 mr-5">
            <Link href={`/myHomePage`} className="mb-1">
              Home
            </Link>
            {isClient && isAdmin && (
              <>
                <Link href={`/productPageAdmin`} className="mb-1">
                  Product Management
                </Link>
                <Link href={`/order`} className="mb-1">
                  Order
                </Link>
                <Link className="mr-5 mb-1" href={`/User`}>
                  User
                </Link>
              </>
            )}
          </div>
        </Header>

        <div className="mt-8 p-4 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Category Management
          </h2>
          <div className="flex justify-center mt-10 mb-10">
            <ButtonCreateCategory getCategoryList={fetchCategories} />
          </div>
          <div className="w-full max-w-2xl">
            {categoryList.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}image/view/${category.picsCategory}`}
                    alt="category"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {category.type}
                    </h3>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <ButtonUpdateCategory
                    id={category.id}
                    currentCategory={category.type}
                    setIsReloadNeeded={setIsReloadNeeded}
                  />
                  <Button
                    onClick={() => handleCategoryDelete(category.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    <ImBin />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="bg-gray-900 text-white py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; 2024 Elsy Ride. All rights reserved.
            </p>
            <div className="mt-2 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Context2.Provider>
  );
};

export default AdminCategoriesPage;
