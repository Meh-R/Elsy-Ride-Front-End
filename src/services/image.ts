import axios from "axios";
export const image = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "content-type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export async function insertImage(refFile: any) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const data = new FormData();
  data.append("file", await refFile.current.files[0]);
  return image.post("image/upload", data, config);
}
