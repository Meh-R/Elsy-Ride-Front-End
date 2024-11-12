"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LogProps } from "@/utils/types";
import { login } from "@/services/auth";
import Image from "next/image";

export default function LoginForm() {
  const { push } = useRouter();

  const schema = yup.object({
    email: yup
      .string()
      .required("ce champs est obligatoire")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "exemple: exemple@mail.com"
      )

      .typeError("il faut un valid email"),
    password: yup

      .string()
      .required("ce champs est obligatoire")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .min(5, "minimum 5 caractéres"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogProps>({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LogProps> = async (data) => {
    let loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      await login(loginData).then((res: any) => {
        console.log(res);

        if (res.status === 201) {
          if (typeof window !== "undefined") {
            console.log("succes");

            window.localStorage.setItem("token", res.data.token.access_token);
            window.localStorage.setItem("role", res.data.role);
            setTimeout(() => {
              push("/myHomePage");
            }, 2000);
          }
        }
      });
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.response.data.message,
      });
    }
  };
  return (
    <div className="h-screen flex">
      <div
        className="hidden lg:flex w-full bg-white lg:w-1/2 login_img_section
          justify-around items-center bg-imgLogin bg-cover bg-no-repeat bg-center "
      >
        <div
          className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
        ></div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <h1 className="text-4xl font-bold p-2 text-black mt-5 tracking-loose md:text-7xl">
          <Image
            src="/Elsy_Bike_transparent.png"
            alt="Elsy Ride Logo"
            width={400}
            height={71}
            priority
          />
        </h1>
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-md shadow-2xl p-5"
          >
            <h2 className="text-gray-800 mb-20 text-4xl font-bold  ">Login</h2>

            <div className="flex  text-gray-800 items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                className=" pl-2 w-full outline-none border-none"
                type="email"
                placeholder="Email Address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex  text-gray-800 items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors?.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex  text-gray-800  ">
              <p className="text-xs">Don't have an account yet ?</p>
              <a
                onClick={() => push("/register")}
                className=" ml-2 text-xs cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Click here
              </a>
            </div>

            <input
              value="sign in"
              type="submit"
              className="block text-xs w-2/6 mt-5 py-2 bg-yellow-100 rounded-2xl hover:bg-yellow-200 hover:-translate-y-1 transition-all duration-500 text-black font-semibold mb-2"
            />
            {errors.root && (
              <p className="text-red-500">{errors.root.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
