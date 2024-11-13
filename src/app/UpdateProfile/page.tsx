"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import userService from "@/services/user";
import toast from "react-hot-toast";
import { UserUpdateDto, AuthProps } from "@/utils/types";
import Link from "next/link";
import BurgerCreate from "@/components/header/BurgerCreate";

const UpdateProfilePage = () => {
  const [userData, setUserData] = useState<AuthProps | null>(null);
  const [formData, setFormData] = useState<UserUpdateDto>({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await userService.getCurrentUser();
        setUserData(userDetails);
        setFormData({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          adresse: userDetails.adresse,
          city: userDetails.city,
          postaleCode: userDetails.postaleCode,
        });
      } catch (error) {
        toast.error("Error retrieving user details.");
        console.error("Error retrieving user details:", error);
      }
    };

    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("role") === "admin");
    }

    fetchUserDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    if (!userData || !userData.id) return;

    try {
      await userService.updateUser(userData.id, formData);
      toast.success("User information updated successfully.");
    } catch (error) {
      toast.error("Failed to update user information.");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <div className="md:hidden">
          <BurgerCreate>
            <Link className="mr-5 mb-1" href={`/myHomePage`}>
              Home
            </Link>
            {isAdmin && (
              <>
                <Link className="mr-5 mb-1" href={`/categoryPageAdmin`}>
                  Category Management
                </Link>
                <Link className="mr-5 mb-1" href={`/productPageAdmin`}>
                  Product Management
                </Link>
                <Link className="mr-5 mb-1" href={`/order`}>
                  Order
                </Link>
                <Link className="mr-5 mb-1" href={`/User`}>
                  User
                </Link>
              </>
            )}
          </BurgerCreate>
        </div>

        <div className="hidden items-center sm:flex">
          <Link href={`/myHomePage`} className="mb-2 mr-5">
            Home
          </Link>
          {isAdmin && (
            <>
              <Link className="mr-5 mb-1" href={`/categoryPageAdmin`}>
                Category Management
              </Link>
              <Link className="mr-5 mb-1" href={`/productPageAdmin`}>
                Product Management
              </Link>
              <Link className="mr-5 mb-1" href={`/order`}>
                Order
              </Link>
              <Link className="mr-5 mb-1" href={`/User`}>
                User
              </Link>
            </>
          )}
        </div>
      </Header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-4xl mb-6">Update User Information</h2>
        {userData ? (
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="text-black rounded-md indent-3 mb-4 border-2 border-gray-400 w-full"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="text-black rounded-md indent-3 mb-4 border-2 border-gray-400 w-full"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="adresse"
              value={formData.adresse || ""}
              onChange={handleChange}
              className="text-black rounded-md indent-3 mb-4 border-2 border-gray-400 w-full"
              placeholder="Address"
            />
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              className="text-black rounded-md indent-3 mb-4 border-2 border-gray-400 w-full"
              placeholder="City"
            />
            <input
              type="number"
              name="postaleCode"
              value={formData.postaleCode || ""}
              onChange={handleChange}
              className="text-black rounded-md indent-3 mb-4 border-2 border-gray-400 w-full"
              placeholder="Postal Code"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdateUser}
                className="bg-gray-200 hover:bg-gray-300 text-black rounded-md p-2"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </main>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 Elsy Ride. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpdateProfilePage;
