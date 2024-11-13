import { UpdateCartHasProductDto } from "@/utils/types";

import axios from "axios";

export async function createCartHasProduct(id: string, quantity: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}cart-has-product/createCartHasProduct/${id}`;
  const axiosConfig = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.post(url, { quantity }, axiosConfig);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function allCartHasProduct() {
  let url = `${process.env.NEXT_PUBLIC_API_URL}cart-has-product/myCartHasProduct`;
  let axiosConfig = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios
    .get(
      url,

      axiosConfig
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
}

export async function deleteCartHasProduct(id: string) {
  {
    let url = `${process.env.NEXT_PUBLIC_API_URL}cart-has-product/deleteCartHasProduct/${id}`;
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return axios
      .delete(
        url,

        axiosConfig
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  }
}

export async function updateCartHasProduct(
  id: string,
  dto: UpdateCartHasProductDto
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}cart-has-product/updateCartHasProduct/${id}`;
  const axiosConfig = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios
    .patch(url, dto, axiosConfig)
    .then((res) => res)
    .catch((e) => e);
}
