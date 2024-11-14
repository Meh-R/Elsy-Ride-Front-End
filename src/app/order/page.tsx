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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchOrders = async (status: "pending" | "send") => {
    try {
      const data = await orderService.getOrdersByStatus(status);
      setOrders(data);
      console.log(data);
    } catch (error) {
      toast.error("Failed to fetch orders.");
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchOrders(filterStatus);
    }
  }, [filterStatus, isClient]);

  const handleStatusChange = async (
    orderId: string | undefined,
    newStatus: string
  ) => {
    if (!orderId) {
      toast.error("Invalid order ID.");
      return;
    }

    try {
      await orderService.updateOrder(orderId, { status: newStatus });
      toast.success("Order status updated successfully!");
      fetchOrders(filterStatus);
    } catch (error) {
      toast.error("Error updating order status.");
      console.error("Error updating order status:", error);
    }
  };

  const isAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") === "admin";
    }
    return false;
  };

  if (!isClient) return null;

  return (
    <div>
      <Header>
        <div className="hidden sm:flex mr-5">
          <Link className="mr-5 mb-1" href="/myHomePage">
            Home
          </Link>
          {isAdmin() && (
            <>
              <Link className="mr-5 mb-1" href="/categoryPageAdmin">
                Category Management
              </Link>
              <Link className="mr-5 mb-1" href="/productPageAdmin">
                Product Management
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
                <Link href="/myHomePage" className="mb-2">
                  Home
                </Link>
                {isAdmin() && (
                  <>
                    <Link href="/categoryPageAdmin" className="mb-2">
                      Category Management
                    </Link>
                    <Link href="/productPageAdmin" className="mb-2">
                      Product Management
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

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Orders</h2>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              filterStatus === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              filterStatus === "send"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterStatus("send")}
          >
            Sent
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
                      Order #{order.id?.slice(0, 8).toUpperCase() || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {order.purchaseDate
                        ? new Date(order.purchaseDate).toLocaleDateString(
                            "en-US"
                          )
                        : "Unknown date"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Name:</span>{" "}
                      {order.cart?.user?.firstName || "Unknown name"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Last Name:</span>{" "}
                      {order.cart?.user?.lastName || "Unknown last name"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Address:</span>{" "}
                      {order.cart?.user?.adresse || "Unknown address"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">City:</span>{" "}
                      {order.cart?.user?.city || "Unknown city"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Postal Code:</span>{" "}
                      {order.cart?.user?.postaleCode || "Unknown postal code"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Total:</span>{" "}
                      {order.total} $
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`${
                          order.status === "pending"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {order.status === "pending" ? "Pending" : "Sent"}
                      </span>
                    </p>
                  </div>

                  {associatedProduct?.product && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                      <h4 className="font-semibold text-gray-800">
                        Ordered Product:
                      </h4>
                      <p className="text-gray-700">
                        <span className="font-semibold">Name:</span>{" "}
                        {associatedProduct.product.name}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Quantity:</span>{" "}
                        {associatedProduct.quantity || "Unknown quantity"}
                      </p>
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="text-gray-600 font-semibold">
                      Change Status:
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="mt-2 px-4 py-2 border rounded w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="send">Sent</option>
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              No orders found for the selected status.
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
