import axios from "axios";

export async function allCategory() {
  let url = `${process.env.NEXT_PUBLIC_API_URL}category/all/0`;
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

export async function createCategory(type: string, picsCategory: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}category/create`;

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
        type: type,
        picsCategory: picsCategory,
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

export async function updateCategory(
  id: string,
  updateData: { [key: string]: any }
) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}category/update/${id}`;

  let axiosConfig = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios
    .patch(url, updateData, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
}
export async function deleteCategory(id: string) {
  {
    let url = `${process.env.NEXT_PUBLIC_API_URL}category/delete/${id}`;
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
