import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import {
  allCartHasProduct,
  deleteCartHasProduct,
  updateCartHasProduct,
  updateProduct,
  productById,
} from "@/services/product";
import orderService from "@/services/order";
import toast from "react-hot-toast";
import { Context } from "@/context/context";
import { AuthProps, CartHasProduct } from "@/utils/types";

const Cart = () => {
  const [cartHasProductList, setCartHasProductList] = useState<
    CartHasProduct[]
  >([]);
  const [user, setUser] = useState<AuthProps | null>(null);
  const { reload, setReload } = useContext(Context);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = async () => {
    try {
      const response = await allCartHasProduct();
      const activeProducts = response.data.cartHasProduct.filter(
        (item: CartHasProduct) => item.isActive
      );

      setCartHasProductList(activeProducts);
      setUser(response.data.user[0]);

      const initialQuantities = activeProducts.reduce((acc: any, item: any) => {
        acc[item.id] = item.quantity ?? 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } catch (error) {
      toast.error("Error loading products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [reload]);

  const handleQuantityChange = (cartHasProductId: string, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[cartHasProductId] || 0;
      const newQuantity = currentQuantity + change;
      const product = cartHasProductList.find(
        (item) => item.id === cartHasProductId
      );

      if (newQuantity < 0) {
        toast.error("Quantity cannot be less than zero.");
        return prev;
      }

      if (product && newQuantity > product.product.stock) {
        toast.error("Quantity cannot exceed available stock.");
        return prev;
      }

      updateCartHasProduct(cartHasProductId, { quantity: newQuantity });
      return { ...prev, [cartHasProductId]: newQuantity };
    });
  };

  const totalGeneral = cartHasProductList.reduce((total, element) => {
    const quantity = quantities[element.id] || 1;
    return total + element.product.price * quantity;
  }, 0);

  const handleBuy = async () => {
    if (!user || !user.cart) {
      toast.error("Cart not found for the user.");
      return;
    }

    try {
      for (const item of cartHasProductList) {
        const quantityToReduce = quantities[item.id] || 1;

        const productResponse = await productById(item.product.id);
        const currentStock = productResponse.data.stock;

        if (currentStock < quantityToReduce) {
          toast.error(
            `Insufficient stock for ${item.product.name}. Requested: ${quantityToReduce}, Available: ${currentStock}`
          );
          return;
        }

        const orderData = {
          cartId: user.cart.id,
          cartHasProductId: item.id,
          total: item.product.price * quantityToReduce,
          status: "pending",
        };

        await orderService.createOrder(orderData);

        const productId = item.product.id;
        const newStock = currentStock - quantityToReduce;

        await updateProduct(productId, { stock: newStock });
        await updateCartHasProduct(item.id, { isActive: false });
      }

      toast.success("Orders created successfully!");
      setCartHasProductList([]);
      setQuantities({});
      setReload(new Date().getTime());
    } catch (error) {
      console.error("Error creating orders:", error);
      toast.error("An error occurred during purchase.");
    }
  };

  const handleDelete = async (cartHasProductId: string) => {
    try {
      await deleteCartHasProduct(cartHasProductId);
      toast.success("Product removed from cart");
      refreshCart();
    } catch (error) {
      toast.error("Failed to remove the product.");
    }
  };

  if (isLoading) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="flex flex-row items-center">
          <RiShoppingCart2Line className="text-3xl" />
          <span className="text-black rounded-full w-6 h-6 flex items-center justify-center text-2xl mt-1 ml-1">
            ({cartHasProductList.length})
          </span>
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Cart</SheetTitle>
        {cartHasProductList.map((element) => (
          <div
            key={element.id}
            className="mt-5 flex flex-row items-center cursor-pointer rounded-lg duration-150 hover:scale-105 hover:shadow-md border-b p-2"
          >
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={`http://localhost:3001/image/view/${element.product.picsProduct}`}
              alt={element.product.name}
            />
            <div className="ml-4 flex-grow">
              <p className="font-medium text-sm text-gray-800">
                {element.product.name}
              </p>
              <p className="font-light text-xs text-gray-600">
                Price: {element.product.price}
              </p>
              <p className="font-light text-xs text-gray-600">
                Quantity: {quantities[element.id] || 1}
              </p>
              <p className="font-light text-xs text-gray-800">
                Total: {element.product.price * (quantities[element.id] || 1)} $
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-1">
                <Button onClick={() => handleQuantityChange(element.id, 1)}>
                  <FaPlus />
                </Button>
                <Button onClick={() => handleQuantityChange(element.id, -1)}>
                  <FaMinus />
                </Button>
              </div>
              <Button onClick={() => handleDelete(element.id)}>
                <RiDeleteBin2Fill />
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-5 flex flex-row justify-between items-center p-4">
          <p className="font-medium text-lg text-gray-800">Total:</p>
          <p className="font-medium text-lg text-gray-800">{totalGeneral} $</p>
        </div>
        <div className="p-4">
          <Button
            className="w-full bg-green-500 text-white"
            onClick={handleBuy}
          >
            Buy Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
