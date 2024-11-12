import { AuthProps, LogProps } from "@/utils/types";
import axios from "axios";

export async function registerUser(authProps: AuthProps) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}auth/signup`;

  let axiosConfig = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return axios
    .post(
      url,
      {
        firstName: authProps.firstName,
        lastName: authProps.lastName,
        adresse: authProps.adresse,
        city: authProps.city,
        postaleCode: Number(authProps.postaleCode),
        email: authProps.email,
        password: authProps.password,
      },
      axiosConfig
    )
    .then((res) => {
      return res;
    });
}

export async function login(LogProps: LogProps) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}auth/signin`;

  let axiosConfig = {
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  return axios
    .post(
      url,
      {
        email: LogProps.email,
        password: LogProps.password,
      },
      axiosConfig
    )
    .then((res) => {
      return res;
    });
}
