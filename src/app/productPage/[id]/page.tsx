"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import { Context } from "@/context/context";
import { productById } from "@/services/product";
import { Product } from "@/utils/types";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { createCartHasProduct } from "@/services/cartHasProduct";

const Page = ({ params }: { params: { id: string } }) => {
  const [detailProduct, setDetailsProduct] = useState<Product>();
  const [productNumber, setProductNumber] = useState(0);
  const [reload, setReload] = useState(1);
  const productId = detailProduct?.id;

  useEffect(() => {
    const getProduct = async () => {
      const response = await productById(params.id);
      setDetailsProduct(response.data);
      console.log(response.data);
    };
    getProduct();
  }, [params.id, reload]);

  const isUserAuthenticated = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") !== null;
    }
    return false;
  };

  const isAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") === "admin";
    }
    return false;
  };

  async function HandlecreateCartHasProduct() {
    if (!isUserAuthenticated()) {
      toast.error(
        "Vous devez être connecté pour ajouter un produit au panier."
      );
      return;
    }

    if (productId) {
      if (productNumber > detailProduct!.stock) {
        toast.error("La quantité ne peut pas dépasser le stock disponible.");
        return;
      }

      if (productNumber <= 0) {
        toast.error("La quantité doit être supérieure à zéro.");
        return;
      }

      await createCartHasProduct(productId, productNumber)
        .then((res) => {
          console.log(res);
          toast.success("Produit ajouté au panier avec succès");
          setReload(new Date().getTime());
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status === 403 &&
            error.response.data.message ===
              "Product already exists in cart as active"
          ) {
            toast.error("Ce produit est déjà dans votre panier.");
          } else {
            toast.error("Une erreur est survenue.");
          }
          console.log(error);
        });
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);

    if (newQuantity > detailProduct!.stock) {
      toast.error("La quantité ne peut pas dépasser le stock disponible.");
      setProductNumber(detailProduct!.stock);
    } else if (newQuantity < 0) {
      toast.error("La quantité ne peut pas être négative.");
      setProductNumber(0);
    } else {
      setProductNumber(newQuantity);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Context.Provider value={{ setReload, reload }}>
        <Header>
          <div className="hidden sm:flex space-x-5 mr-5">
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
          </div>

          <div className="sm:hidden flex items-center mr-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <RxHamburgerMenu className="text-3xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto bg-white shadow-lg z-50">
                <div className="p-2 flex flex-col">
                  <Link href={`/myHomePage`} className="mb-2">
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
        </Header>
      </Context.Provider>

      <main className="flex-grow">
        <div className="mt-20 flex flex-col items-center md:flex md:flex-row md:mt-15 md:mb-10 md:ml-20">
          <input
            type="number"
            value={productNumber}
            onChange={handleQuantityChange}
            className="w-1/6 md:w-1/6 text-black rounded-md indent-3 mb-5 mt-5 border-2 border-gray-400"
            placeholder="Quantity"
            required
          />
          <button
            className="w-2/6 md:w-1/6 bg-yellow-100 hover:bg-yellow-200 h-15 text-black rounded-md text-center p-2 m-4"
            onClick={HandlecreateCartHasProduct}
          >
            Add to cart
          </button>
        </div>

        <div className="md:flex md:flex-row">
          <img
            className="w-full md:w-1/3 md:ml-10 md:mb-10 object-cover object-center"
            src={`${process.env.NEXT_PUBLIC_API_URL}image/view/${detailProduct?.picsProduct}`}
            alt="product"
          />
          <div className="m-20">
            <p className="my-4 pl-4 text-2xl text-zinc-600 font-bold">
              {detailProduct?.name}
            </p>
            <p className="my-4 pl-4 font-bold text-gray-800">
              Description: {detailProduct?.description}
            </p>
            <p className="my-4 pl-4 font-bold text-gray-800">
              Stock: {detailProduct?.stock}
            </p>
            <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
              Price: {detailProduct?.price} $
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 Elsy Ride. All rights reserved.</p>
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
  );
};

export default Page;
