"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import userService from "@/services/user";
import { productById } from "@/services/product";
import { Order, AuthProps, Product } from "@/utils/types";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";

const OrdersPage = () => {
  const [user, setUser] = useState<AuthProps | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("role") === "admin");
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
        setOrders(userData.cart?.orders || []);

        const productPromises = userData.cart?.cart_Has_Product.map(
          async (item: any) => {
            const productData = await productById(item.productId);
            return { id: item.productId, data: productData.data };
          }
        );

        const resolvedProducts = await Promise.all(productPromises || []);
        const productMap = resolvedProducts.reduce((acc, { id, data }) => {
          acc[id] = data;
          return acc;
        }, {} as { [key: string]: Product });

        setProducts(productMap);
      } catch (error) {
        toast.error("Erreur lors de la récupération des données utilisateur.");
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <div className="hidden sm:flex mr-5">
          <Link className="mr-5 mb-1" href={`/myHomePage`}>
            Home
          </Link>
          {isAdmin && (
            <>
              <Link className="mr-5 mb-1" href={`/categoryPageAdmin`}>
                Category Management
              </Link>
              <Link className="mr-5 mb-1" href={`/productPageAdmin`}>
                Product Management
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
                {isAdmin && (
                  <>
                    <Link href={`/categoryPageAdmin`} className="mb-2">
                      Category Management
                    </Link>
                    <Link href={`/productPageAdmin`} className="mb-2">
                      Product Management
                    </Link>
                  </>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Header>

      <main className="flex-grow p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">My orders</h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id || "order-unknown"}
              className="p-6 bg-white border rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Commande #{order.id?.slice(0, 8).toUpperCase() || "Inconnue"}
                </h3>
                <p className="text-sm text-gray-500">
                  {order.purchaseDate
                    ? new Date(order.purchaseDate).toLocaleDateString("fr-FR")
                    : "Date inconnue"}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Nom:</span>{" "}
                  {user?.firstName || "Nom inconnu"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Prénom:</span>{" "}
                  {user?.lastName || "Prénom inconnu"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Adresse:</span>{" "}
                  {user?.adresse || "Adresse inconnue"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Ville:</span>{" "}
                  {user?.city || "Ville inconnue"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Code Postal:</span>{" "}
                  {user?.postaleCode || "Code postal inconnu"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total:</span> ${order.total}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Statut:</span>{" "}
                  <span
                    className={`${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status === "pending" ? "En Attente" : "Envoyé"}
                  </span>
                </p>
              </div>

              {user?.cart.cart_Has_Product
                .filter((item) => item.id === order.cartHasProductId)
                .map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="mt-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <h4 className="font-semibold text-gray-800">
                      Produit Commandé:
                    </h4>
                    <p className="text-gray-700">
                      <span className="font-semibold">Nom:</span>{" "}
                      {products[cartItem.productId]?.name || "Nom inconnu"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Quantité:</span>{" "}
                      {cartItem.quantity || "Quantité inconnue"}
                    </p>
                  </div>
                ))}
            </div>
          ))}
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

export default OrdersPage;
