import { Product } from "@/utils/types";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import ButtonUpdateProduct from "./buttonUpdateProduct";
import { Context2 } from "@/context/context2";
import { Button } from "../ui/button";
import { ImBin } from "react-icons/im";
import { deleteProduct } from "@/services/product";
import toast from "react-hot-toast";

const ItemCardList = ({ productList }: { productList: Product[] }) => {
  const { isReloadNeeded, setIsReloadNeeded } = useContext(Context2);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("role") === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  async function productDelete(elementId: string) {
    await deleteProduct(elementId)
      .then(async () => {
        toast.success("Product deleted");
        setIsReloadNeeded(new Date().getTime());
      })
      .catch((e) => {
        toast.error("Ça n'a pas fonctionné.");
        console.error(e);
      });
  }

  return (
    <div className="md:flex md:flex-row md:flex-wrap sm:hidden bg-slate-100 p-5 rounded-lg">
      {productList &&
        productList.map((item: Product) => (
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
                    type: {item.category.type}
                  </p>
                )}
                <p className="my-4 pl-4 font-bold text-gray-800">{item.name}</p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                  price: {item.price} $
                </p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ItemCardList;
