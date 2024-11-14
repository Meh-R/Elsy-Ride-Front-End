"use client";
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Order, AuthProps, Product } from "@/utils/types";

const logoUrl = "/Elsy_Bike_transparent.png";

type InvoicePDFProps = {
  order: Order;
  user: AuthProps;
  products: { [key: string]: Product };
};

const generatePDF = async ({ order, user, products }: InvoicePDFProps) => {
  const doc = new jsPDF();

  const img = new Image();
  img.src = logoUrl;

  img.onload = () => {
    const originalWidth = img.width;
    const originalHeight = img.height;

    const maxWidth = 50;
    const aspectRatio = originalHeight / originalWidth;
    const adjustedHeight = maxWidth * aspectRatio;

    doc.addImage(img, "PNG", 10, 10, maxWidth, adjustedHeight);

    doc.setFontSize(12);
    doc.text(
      `Order #${order.id?.slice(0, 8).toUpperCase()}`,
      10,
      40 + adjustedHeight - 20
    );
    doc.text(
      `Customer Name: ${user.firstName} ${user.lastName}`,
      10,
      50 + adjustedHeight - 20
    );
    doc.text(`Address: ${user.adresse}`, 10, 60 + adjustedHeight - 20);
    doc.text(`City: ${user.city}`, 10, 70 + adjustedHeight - 20);
    doc.text(`Postal Code: ${user.postaleCode}`, 10, 80 + adjustedHeight - 20);
    doc.text(`Total: $${order.total}`, 10, 90 + adjustedHeight - 20);
    doc.text(
      `Order Date: ${
        order.purchaseDate
          ? new Date(order.purchaseDate).toLocaleDateString()
          : "Unknown"
      }`,
      10,
      100 + adjustedHeight - 20
    );

    const productRows = user.cart.cart_Has_Product
      .filter((item) => item.id === order.cartHasProductId)
      .map((cartItem) => [
        products[cartItem.productId]?.name || "Unknown",
        cartItem.quantity?.toString() || "Unknown",
      ]);

    doc.autoTable({
      head: [["Product Name", "Quantity"]],
      body: productRows,
      startY: 110 + adjustedHeight - 20,
    });

    doc.setFontSize(10);
    doc.text(
      "Thank you for your purchase! Elsy Ride © 2024",
      10,
      doc.internal.pageSize.height - 10
    );

    doc.save(`Invoice_${order.id?.slice(0, 8).toUpperCase()}.pdf`);
  };
};

const InvoiceButton: React.FC<InvoicePDFProps> = ({
  order,
  user,
  products,
}) => {
  return (
    <button
      onClick={() => generatePDF({ order, user, products })}
      className="flex items-center space-x-2 text-black py-2 px-4 "
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
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
      <span>download your invoice</span>
    </button>
  );
};

export default InvoiceButton;
