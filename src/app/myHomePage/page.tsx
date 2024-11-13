"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import { Context2 } from "@/context/context2";
import Link from "next/link";
import {
  allProducts,
  searchProducts,
  productByCategory,
} from "@/services/product";
import { Category, Product } from "@/utils/types";
import ItemCardList from "@/components/list/ItemCardList";
import Pagination from "@/components/header/Pagination";
import { allCategory } from "@/services/category";
import ItemCategoryList from "@/components/list/ItemCategoryList";
import BurgerCreate from "@/components/header/BurgerCreate";

const Page = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isReloadNeeded, setIsReloadNeeded] = useState(1);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [text1, setText1] = useState("");
  const [isSortedByPrice, setIsSortedByPrice] = useState(false);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      let response;
      if (text1) {
        response = await searchProducts(text1);
      } else if (selectedCategory) {
        response = await productByCategory(selectedCategory, page);
      } else {
        response = await allProducts(page);
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

  const paginatedProducts = productList.slice(
    page * productsPerPage,
    page * productsPerPage + productsPerPage
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setPage(0);
    setText1("");
  };

  const toggleSortByPrice = () => {
    setIsSortedByPrice((prev) => !prev);
  };

  const isAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") === "admin";
    }
    return false;
  };

  return (
    <Context2.Provider value={{ isReloadNeeded, setIsReloadNeeded }}>
      <div className="bg-slate-100">
        <Header>
          <div className="md:hidden">
            <BurgerCreate>
              <Link className="mr-5 mb-1" href={`/myHomePage`}>
                Home
              </Link>
              {isAdmin() && (
                <>
                  <Link className="mr-5 mb-1" href={`/categoryPageAdmin`}>
                    Category Management
                  </Link>
                  <Link className="mr-5 mb-1" href={`/productPageAdmin`}>
                    Product Management
                  </Link>
                  <Link className="mr-5 mb-1" href={`/order`}>
                    Order
                  </Link>
                  <Link className="mr-5 mb-1" href={`/User`}>
                    User
                  </Link>
                </>
              )}
            </BurgerCreate>
          </div>

          <div className="hidden sm:flex">
            {isAdmin() && (
              <>
                <Link className="mr-5 mb-1" href={`/categoryPageAdmin`}>
                  Category Management
                </Link>
                <Link className="mr-5 mb-1" href={`/productPageAdmin`}>
                  Product Management
                </Link>
                <Link className="mr-5 mb-1" href={`/order`}>
                  Order
                </Link>
                <Link className="mr-5 mb-1" href={`/User`}>
                  User
                </Link>
              </>
            )}
          </div>
        </Header>

        <h2 className="m-10 text-3xl font-bold text-zinc-600">Category</h2>

        <ItemCategoryList
          categoryList={categoryList}
          handleCategorySelect={handleCategorySelect}
        />

        <h2 className="m-10 text-3xl font-bold text-zinc-600">Product</h2>
        <div className="flex flex-row justify-between items-center">
          <div className="ml-20 w-1/6 border-b-2 border-gray-800 py-2">
            <input
              onChange={(e) => setText1(e.target.value)}
              value={text1}
              className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search product"
            />
          </div>

          <div className="mr-20 p-4">
            <button onClick={toggleSortByPrice} className="text-sm text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <ItemCardList productList={paginatedProducts} />

        {!text1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={Math.ceil(productList.length / productsPerPage)}
          />
        )}
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
