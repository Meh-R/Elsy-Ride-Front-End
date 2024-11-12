import { UpdateCartHasProductDto } from "@/utils/types";

import axios from "axios";

export async function allProducts(page: number) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}product/all/${page}`;
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

export async function searchProducts(query: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}product/find/${query}`;
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

export async function productByCategory(type: string, page: number) {
  {
    let url = `${process.env.NEXT_PUBLIC_API_URL}product/category/${type}/${page}`;
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
}

export async function createProduct(
  name: string,
  picsProduct: string,
  description: string,
  price: number,
  stock: number,
  categoryId: string
) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}product/create`;

  let axiosConfig = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios
    .post(
      url,
      {
        name: name,
        picsProduct: picsProduct,
        description: description,
        price: price,
        stock: stock,
        categoryId: categoryId,
      },
      axiosConfig
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
}

export async function productById(id: string) {
  {
    let url = `${process.env.NEXT_PUBLIC_API_URL}product/findId/${id}`;
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
}
export async function createCartHasProduct(id: string, quantity: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}product/createCartHasProduct/${id}`;
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
  let url = `${process.env.NEXT_PUBLIC_API_URL}product/myCartHasProduct`;
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
    let url = `${process.env.NEXT_PUBLIC_API_URL}product/deleteCartHasProduct/${id}`;
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
  const url = `${process.env.NEXT_PUBLIC_API_URL}product/updateCartHasProduct/${id}`;
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

export async function updateProduct(
  id: string,
  updateData: { [key: string]: any }
) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}product/update/${id}`;

  let axiosConfig = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios
    .patch(
      url,

      updateData,

      axiosConfig
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
}

export async function deleteProduct(id: string) {
  {
    let url = `${process.env.NEXT_PUBLIC_API_URL}product/delete/${id}`;
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
