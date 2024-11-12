import {
  allCategory,
  createCategory,
  updateCategory,
} from "@/services/category";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Box, Modal } from "@mui/material";
import { insertImage } from "@/services/image";
import { RxUpdate } from "react-icons/rx";

const ButtonUpdateCategory = ({
  setIsReloadNeeded,
  id,
  currentCategory,
}: {
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  currentCategory: string;
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
  const [type, setType] = useState("");
  const [picsCategory, setPicsCategory] = useState("");
  const refFile = useRef<HTMLInputElement>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setType("");
    setPicsCategory("");
    if (refFile.current) refFile.current.value = "";
  };

  async function handleUpdateCategory() {
    const updateData: { [key: string]: any } = {};

    if (type) updateData.type = type;

    if (refFile.current?.files?.length) {
      try {
        const res = await insertImage(refFile);
        updateData.picsCategory = res.data;
        toast.success("Image uploaded");
        setPicsCategory(res.data);
      } catch (error) {
        toast.error("Image upload failed.");
        console.error("Image upload error:", error);
        return;
      }
    }

    try {
      await updateCategory(id, updateData);
      toast.success("Category successfully updated");
      setIsReloadNeeded((prev) => prev + 1);
      handleClose();
    } catch (error) {
      toast.error("Category update failed.");
      console.error("Update error:", error);
    }
  }

  const isAdmin =
    typeof window !== "undefined" &&
    window.localStorage.getItem("role") === "admin";
  if (!isAdmin) return null;

  return (
    <div className="flex justify-center">
      <button onClick={handleOpen} className="text-black p-2 text-sm">
        <RxUpdate />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-4xl text-center mb-10">Update Category</h2>
          <input
            type="text"
            onChange={(e) => setType(e.target.value)}
            value={type}
            className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            placeholder={currentCategory}
          />
          <input
            ref={refFile}
            type="file"
            className="text-black bg-white rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            placeholder="Upload Image"
          />
          <div className="flex justify-center items-center">
            <button
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 h-15 text-black rounded-md p-2 m-4"
            >
              Cancel
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 h-15 text-black rounded-md p-2 m-4"
              onClick={handleUpdateCategory}
            >
              Update Category
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ButtonUpdateCategory;
