import React, { useContext, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { productByCategory } from "@/services/product";
import { Category, Product } from "@/utils/types";
import ButtonUpdateCategory from "./buttonUpdateCategory";
import { Context2 } from "@/context/context2";
import { Button } from "../ui/button";
import { ImBin } from "react-icons/im";
import { deleteCategory } from "@/services/category";
import toast from "react-hot-toast";

const ItemCategoryList = ({
  categoryList,
  handleCategorySelect,
}: {
  categoryList: Category[];
  handleCategorySelect: (category: string) => void;
}) => {
  const { isReloadNeeded, setIsReloadNeeded } = useContext(Context2);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("role") === "admin");
  }, []);

  async function categoryDelete(elementId: string) {
    await deleteCategory(elementId)
      .then(() => {
        toast.success("Category deleted");
        setIsReloadNeeded((prev) => prev + 1);
      })
      .catch((e) => {
        toast.error("Ça n'a pas fonctionné.");
        console.error(e);
      });
  }

  return (
    <div className="flex justify-center w-full">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {categoryList &&
            categoryList.map((item: Category) => (
              <CarouselItem key={item.id} className="md:max-w-xs mx-auto">
                <div
                  className="cursor-pointer"
                  onClick={() => handleCategorySelect(item.type)}
                >
                  <h2 className="my-4 pl-4 font-bold text-gray-500">
                    {item.type}
                  </h2>
                  <img
                    className="w-full h-auto"
                    src={`${process.env.NEXT_PUBLIC_API_URL}image/view/${item.picsCategory}`}
                    alt="category"
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ItemCategoryList;
