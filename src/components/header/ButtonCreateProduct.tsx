import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Modal } from "@mui/material";
import toast from "react-hot-toast";
import { createProduct } from "@/services/product";
import { insertImage } from "@/services/image";
import { Category } from "@/utils/types";
import { Context2 } from "@/context/context2";

const ButtonCreateProduct = ({
  getCategoryList,
  categoryList,
}: {
  getCategoryList: () => void;
  categoryList: Category[];
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { setIsReloadNeeded } = useContext(Context2);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const refFile = useRef<HTMLInputElement>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const role = window.localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  async function HandleCreateProduct() {
    try {
      const res = await insertImage(refFile);
      const imageUrl = res.data;
      toast.success("Image inserted");

      await createProduct(
        name,
        imageUrl,
        description,
        price,
        stock,
        categoryId
      );
      toast.success("Product created");
      setIsReloadNeeded((prev) => prev + 1);
      getCategoryList();
      handleClose();
    } catch (error) {
      toast.error("An error occurred while creating the product.");
      console.error(error);
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    setCategoryId("");
    if (refFile.current) refFile.current.value = "";
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleOpen}
        className="text-black w-40 p-2 text-xl z-100 mr-5"
      >
        Create product
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-center mb-10">Create product</h2>

          <label className="font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            placeholder="Enter product name"
            required
          />

          <label className="font-medium">Select Image</label>
          <input
            ref={refFile}
            type="file"
            className="text-black bg-white rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            required
          />

          <label className="font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            placeholder="Enter product description"
            required
          />

          <label className="font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            placeholder="Enter price"
            required
          />

          <label className="font-medium">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="text-black rounded-md mb-10 indent-3 border-2 border-gray-400 w-full"
            placeholder="Enter stock quantity"
            required
          />

          <label className="font-medium">Select Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="text-neutral-400 bg-white rounded-md mb-10 indent-3 border-2 border-gray-400 w-full"
          >
            <option value="">Choose a category</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.type}
              </option>
            ))}
          </select>

          <div className="flex justify-center items-center">
            <button
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 h-15 text-black rounded-md text-center p-2 m-4"
            >
              Annuler
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 h-15 text-black rounded-md text-center p-2 m-4"
              onClick={HandleCreateProduct}
            >
              Create new product
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ButtonCreateProduct;
