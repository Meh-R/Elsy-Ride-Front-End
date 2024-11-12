"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { AuthProps } from "@/utils/types";
import { registerUser } from "@/services/auth";
import { FaCity } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

export default function RegisterForm() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthProps>({ mode: "onChange" });
  console.log(errors);

  const onSubmit: SubmitHandler<AuthProps> = async (data) => {
    try {
      await registerUser(data).then((res) => {
        console.log(res);

        if (res.status === 201) {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("token", res.data.access_token);
            setTimeout(() => {
              alert("A validation email has been sent to you");
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
        className="bg-white hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center bg-ImgRegister bg-cover bg-no-repeat bg-right "
      ></div>

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
            <h2 className="text-gray-800 md:mb-10   md:text-5xl font-bold text-2xl  mb-1">
              Register
            </h2>
            <div className="flex text-gray-800 items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <BiSolidUser />
              <input
                id="firstName"
                className=" pl-2 w-full outline-none border-none"
                type="text"
                placeholder="First Name"
                {...register("firstName", {
                  required: "ce champs est obligatoire",
                  minLength: { value: 2, message: "minimum 2 caracteres" },
                  maxLength: { value: 20, message: "maximum 20 caracteres" },
                })}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>{" "}
            <div className="flex text-gray-800 items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <BiSolidUser />
              <input
                id="lastName"
                className=" pl-2 w-full outline-none border-none"
                type="text"
                placeholder="Last name"
                {...register("lastName", {
                  required: "ce champs est obligatoire",
                  minLength: { value: 4, message: "minimum 4 caracteres" },
                  maxLength: { value: 20, message: "maximum 20 caracteres" },
                })}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            <div className="flex text-gray-800 items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <FaCity />
              <input
                id="adresse"
                className=" pl-2 w-full outline-none border-none"
                type="text"
                placeholder="adresse"
                {...register("adresse", {
                  required: "ce champs est obligatoire",
                  minLength: { value: 3, message: "minimum 3 caracteres" },
                  maxLength: { value: 55, message: "maximum 55 caracteres" },
                })}
              />
              {errors.adresse && (
                <p className="text-red-500">{errors.adresse.message}</p>
              )}
            </div>
            <div className="flex text-gray-800 items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <FaCity />
              <input
                id="postaleCode"
                className=" pl-2 w-full outline-none border-none"
                type="number"
                placeholder="postaleCode"
                {...register("postaleCode", {
                  required: "ce champs est obligatoire",
                  minLength: { value: 5, message: "minimum 5 caracteres" },
                  maxLength: { value: 5, message: "maximum 5 caracteres" },
                })}
              />
              {errors.postaleCode && (
                <p className="text-red-500">{errors.postaleCode.message}</p>
              )}
            </div>
            <div className="flex text-gray-800 items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <FaCity />
              <input
                id="city"
                className=" pl-2 w-full outline-none border-none"
                type="text"
                placeholder="city"
                {...register("city", {
                  required: "ce champs est obligatoire",
                  minLength: { value: 4, message: "minimum 4 caracteres" },
                  maxLength: { value: 20, message: "maximum 20 caracteres" },
                })}
              />
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div className="flex text-gray-800 items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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
                {...register("email", {
                  required: "ce champs est obligatoire",

                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "veuillez insérer une email valide",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex text-gray-800 items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
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
                {...register("password", {
                  required: "ce champs est obligatoire",
                  minLength: { value: 4, message: "minimum 4 caracteres" },
                  maxLength: { value: 20, message: "maximum 20 caracteres" },
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                  //   message:
                  //     "Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                  // },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {errors.root && (
              <p className="text-red-500">{errors.root.message}</p>
            )}
            <div className="flex  text-gray-800  ">
              <p className="text-xs">you have an account ?</p>
              <a
                onClick={() => push("/login")}
                className=" ml-2 text-xs cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Click here
              </a>
            </div>
            <input
              value="sign up"
              type="submit"
              className="block w-2/6 mt-5 py-2 bg-yellow-100 rounded-2xl hover:bg-yellow-200 hover:-translate-y-1 transition-all duration-500 text-black font-semibold mb-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
