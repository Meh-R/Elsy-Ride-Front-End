"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import orderService from "@/services/order";
import { Order } from "@/utils/types";
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<"pending" | "send">(
    "pending"
  );

  const fetchOrders = async (status: "pending" | "send") => {
    try {
      const data = await orderService.getOrdersByStatus(status);
      setOrders(data);
      console.log(data);
    } catch (error) {
      toast.error("No order");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders(filterStatus);
  }, [filterStatus]);

  const handleStatusChange = async (
    orderId: string | undefined,
    newStatus: string
  ) => {
    if (!orderId) {
      toast.error("ID de commande non valide.");
      return;
    }

    try {
      await orderService.updateOrder(orderId, { status: newStatus });
      toast.success("Statut mis à jour avec succès !");
      fetchOrders(filterStatus);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut.");
      console.error(error);
    }
  };

  const isAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") === "admin";
    }
    return false;
  };

  return (
    <div>
      <Header>
        <div className="hidden sm:flex mr-5 ">
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

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Order</h2>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              filterStatus === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterStatus("pending")}
          >
            En Attente
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              filterStatus === "send"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterStatus("send")}
          >
            Envoyé
          </button>
        </div>

        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => {
              const associatedProduct = order.cart?.cart_Has_Product.find(
                (item) => item.id === order.cartHasProductId
              );

              return (
                <div
                  key={order.id || "order-unknown"}
                  className="p-6 bg-white border rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Commande #
                      {order.id?.slice(0, 8).toUpperCase() || "Inconnue"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {order.purchaseDate
                        ? new Date(order.purchaseDate).toLocaleDateString(
                            "fr-FR"
                          )
                        : "Date inconnue"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Nom:</span>{" "}
                      {order.cart?.user?.firstName || "Nom inconnu"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Prénom:</span>{" "}
                      {order.cart?.user?.lastName || "Prénom inconnu"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Adresse:</span>{" "}
                      {order.cart?.user?.adresse || "Adresse inconnue"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Ville:</span>{" "}
                      {order.cart?.user?.city || "Ville inconnue"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Code Postal:</span>{" "}
                      {order.cart?.user?.postaleCode || "Code postal inconnu"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Total:</span>{" "}
                      {order.total} $
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

                  {associatedProduct?.product && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                      <h4 className="font-semibold text-gray-800">
                        Produit Commandé:
                      </h4>
                      <p className="text-gray-700">
                        <span className="font-semibold">Nom:</span>{" "}
                        {associatedProduct.product.name}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Quantité:</span>{" "}
                        {associatedProduct.quantity || "Quantité inconnue"}
                      </p>
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="text-gray-600 font-semibold">
                      Modifier le Statut:
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="mt-2 px-4 py-2 border rounded w-full"
                    >
                      <option value="pending">En Attente</option>
                      <option value="send">Envoyé</option>
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              Aucun ordre trouvé pour le statut sélectionné.
            </p>
          )}
        </div>
      </div>
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
