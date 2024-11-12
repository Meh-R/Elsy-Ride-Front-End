import React, { useEffect, useRef, useState } from "react";
import { Box, Modal } from "@mui/material";
import toast from "react-hot-toast";
import { allCategory } from "@/services/category";
import { updateProduct, productById } from "@/services/product"; // Importation de `productById` pour récupérer les détails du produit
import { insertImage } from "@/services/image";
import { Category } from "@/utils/types";
import { RxUpdate } from "react-icons/rx";

const ButtonUpdateProduct = ({
  setIsReloadNeeded,
  id,
}: {
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<number>>;
  id: string;
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

  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState("");
  const [picsProduct, setPicsProduct] = useState("");
  const refFile = useRef<HTMLInputElement>(null);

  const handleOpen = async () => {
    setOpen(true);
    await fetchProductDetails();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setPicsProduct("");
    if (refFile.current) refFile.current.value = "";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await allCategory();
        setCategoryList(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des catégories.");
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await productById(id);
      const productData = response.data;
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setStock(productData.stock);
      setCategoryId(productData.categoryId);
    } catch (error) {
      toast.error("Erreur lors du chargement des détails du produit.");
      console.error("Erreur lors de la récupération des détails:", error);
    }
  };

  async function HandleUpdateProduct() {
    const updateData: { [key: string]: any } = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== "") updateData.price = price;
    if (stock !== "") updateData.stock = stock;
    if (categoryId) updateData.categoryId = categoryId;

    if (refFile.current?.files?.length) {
      try {
        const res = await insertImage(refFile);
        updateData.picsProduct = res.data;
        toast.success("Image insérée");
        setPicsProduct(res.data);
      } catch (error) {
        toast.error("Échec du téléchargement de l'image.");
        console.error("Erreur de téléchargement de l'image:", error);
        return;
      }
    }

    try {
      await updateProduct(id, updateData);
      toast.success("Produit mis à jour avec succès");
      setIsReloadNeeded((prev) => prev + 1);
      handleClose();
    } catch (error) {
      toast.error("Échec de la mise à jour du produit.");
      console.error("Erreur de mise à jour:", error);
    }
  }

  if (
    typeof window !== "undefined" &&
    window.localStorage.getItem("role") === "admin"
  ) {
    return (
      <div className="flex justify-center">
        <button
          onClick={handleOpen}
          className="text-black w-auto p-2 text-sm z-100"
        >
          <RxUpdate />
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 className="text-4xl text-center mb-10">Update Product</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
              placeholder="Nom"
            />
            <input
              ref={refFile}
              type="file"
              className="text-black bg-white rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
              placeholder="Télécharger l'image"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
              placeholder="Description"
            />
            <input
              type="number"
              value={price === "" ? "" : price}
              onChange={(e) =>
                setPrice(e.target.value ? Number(e.target.value) : "")
              }
              className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
              placeholder="Prix"
            />
            <input
              type="number"
              value={stock === "" ? "" : stock}
              onChange={(e) =>
                setStock(e.target.value ? Number(e.target.value) : "")
              }
              className="text-black rounded-md mb-10 indent-3 border-2 border-gray-400 w-full"
              placeholder="Stock"
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="text-neutral-400 bg-white rounded-md mb-10 indent-3 border-2 border-gray-400 w-full"
            >
              <option value="">Sélectionner une catégorie</option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.type}
                </option>
              ))}
            </select>

            <div className="flex justify-center items-center">
              <button
                onClick={handleClose}
                className="bg-gray-200 hover:bg-gray-300  h-15 text-black rounded-md text-center p-2 m-4"
              >
                Annuler
              </button>
              <button
                onClick={HandleUpdateProduct}
                className="bg-gray-200 hover:bg-gray-300  h-15 text-black rounded-md text-center p-2 m-4"
              >
                Mettre à jour le produit
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

  return null;
};

export default ButtonUpdateProduct;
