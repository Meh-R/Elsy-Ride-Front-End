import { allCategory, createCategory } from "@/services/category";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Box, Modal } from "@mui/material";
import { insertImage } from "@/services/image";
import { Context2 } from "@/context/context2";
import { Category } from "@/utils/types";

const ButtonCreateCategory = ({
  getCategoryList,
}: {
  getCategoryList: () => void;
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
  const [type, setType] = useState("");
  const [picsCategory, setPicsCategory] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const refFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function HandleCreateCategory() {
    await insertImage(refFile).then(async (res) => {
      toast.success("Image inserted");
      setPicsCategory(res.data);
      createCategory(type, res.data)
        .then((response) => {
          toast.success("Successfully created category");
          setIsReloadNeeded((prev) => prev + 1);
          getCategoryList();
          handleClose();
        })
        .catch((e) => {
          toast.error("This didn't work.");
          console.log(e);
        });
    });
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex justify-center mr-5">
      <button onClick={handleOpen} className="text-black w-auto p-2 text-xl ">
        Create Category
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-4xl text-center mb-10">Create Category</h2>
          <input
            type="text"
            onChange={(e) => setType(e.target.value)}
            className="text-black rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            placeholder="Category Name"
            required
          />
          <input
            ref={refFile}
            type="file"
            className="text-black bg-white rounded-md indent-3 mb-10 border-2 border-gray-400 w-full"
            placeholder="Select Image"
            required
          />

          <div className="flex justify-center items-center">
            <button
              onClick={handleClose}
              className="bg-gray-200 h-15 text-black rounded-md text-center p-2 m-4  hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              onClick={HandleCreateCategory}
              className="bg-gray-200 h-15 text-black rounded-md text-center p-2 m-4  hover:bg-gray-300"
            >
              Create New Category
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ButtonCreateCategory;
