"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import ButtonCreateProduct from "@/components/header/ButtonCreateProduct";
import {
  allProducts,
  searchProducts,
  productByCategory,
} from "@/services/product";
import { Category, Product } from "@/utils/types";
import { deleteProduct } from "@/services/product";
import toast from "react-hot-toast";
import Link from "next/link";
import { Context2 } from "@/context/context2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ImBin } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import { allCategory } from "@/services/category";
import ButtonUpdateProduct from "@/components/list/buttonUpdateProduct";

const Page = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isReloadNeeded, setIsReloadNeeded] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [text1, setText1] = useState("");
  const [isSortedByPrice, setIsSortedByPrice] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(window.localStorage.getItem("role") === "admin");
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let response;
      if (text1) {
        response = await searchProducts(text1);
      } else if (selectedCategory) {
        response = await productByCategory(selectedCategory, 0);
      } else {
        response = await allProducts(0);
      }

      let sortedProducts = response.data;
      sortedProducts = isSortedByPrice
        ? sortedProducts.sort((a: any, b: any) => b.price - a.price)
        : sortedProducts.sort((a: any, b: any) => a.price - b.price);

      setProductList(sortedProducts);
    };

    fetchProducts();
  }, [isReloadNeeded, isSortedByPrice, selectedCategory, text1]);

  const getCategoryList = async () => {
    const response = await allCategory();
    setCategoryList(response.data);
  };

  useEffect(() => {
    getCategoryList();
  }, [isReloadNeeded]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setText1("");
  };

  const toggleSortByPrice = () => {
    setIsSortedByPrice((prev) => !prev);
  };

  async function productDelete(elementId: string) {
    try {
      await deleteProduct(elementId);
      toast.success("Product deleted");
      setIsReloadNeeded((prev) => prev + 1);
    } catch (e) {
      toast.error("Deletion failed.");
      console.error(e);
    }
  }

  return (
    <Context2.Provider value={{ isReloadNeeded, setIsReloadNeeded }}>
      <div className="min-h-screen flex flex-col bg-slate-100">
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
                  {isAdmin && (
                    <>
                      <Link href={`/categoryPageAdmin`} className="mb-2">
                        Category Management
                      </Link>
                      <Link href={`/order`} className="mb-2">
                        Order
                      </Link>
                      <Link href={`/User`} className="mb-2">
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
            {isAdmin && (
              <>
                <Link href={`/categoryPageAdmin`} className="mb-1">
                  Category Management
                </Link>
                <Link href={`/order`} className="mb-1">
                  Order
                </Link>
                <Link href={`/User`} className="mb-1">
                  User
                </Link>
              </>
            )}
          </div>
        </Header>

        <main className="flex-grow p-10">
          <h2 className="text-2xl text-center mt-10 font-semibold mb-6 text-gray-700">
            Product Management
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-10 py-5">
            <div className="w-full md:w-1/3 border-b-2 border-gray-800">
              <input
                onChange={(e) => setText1(e.target.value)}
                value={text1}
                className="appearance-none bg-transparent border-none text-gray-700 w-full py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search product"
              />
            </div>

            <div className="w-full md:w-auto flex justify-center mt-4 md:mt-0">
              <ButtonCreateProduct
                getCategoryList={getCategoryList}
                categoryList={categoryList}
              />
            </div>

            <div className="flex justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0">
              <button
                onClick={toggleSortByPrice}
                className="text-sm text-black p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="md:flex md:flex-row md:flex-wrap sm:hidden bg-slate-100 p-5 rounded-lg">
            {productList.map((item: Product) => (
              <div
                key={item.id}
                className="md:w-1/4 mb-6 flex flex-col items-center justify-center"
              >
                <Link
                  href={`/productPage/${item.id}`}
                  className="flex items-center justify-center bg-slate-100"
                >
                  <div className="max-w-xs bg-white cursor-pointer rounded-lg p-2 duration-150 hover:scale-104 hover:shadow-md">
                    <img
                      className="w-full rounded-lg object-cover object-center"
                      src={`${process.env.NEXT_PUBLIC_API_URL}image/view/${item.picsProduct}`}
                      alt="product"
                    />
                    {item.category && (
                      <p className="my-4 pl-4 font-bold text-gray-500">
                        Type: {item.category.type}
                      </p>
                    )}
                    <p className="my-4 pl-4 font-bold text-gray-800">
                      {item.name}
                    </p>
                    <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                      Price: {item.price} $
                    </p>
                  </div>
                </Link>
                <div className="flex space-x-4 mt-2 ml-2">
                  <ButtonUpdateProduct
                    setIsReloadNeeded={setIsReloadNeeded}
                    id={item.id}
                  />
                  {isAdmin && (
                    <Button onClick={() => productDelete(item.id)}>
                      <ImBin />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

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

export default Page;
