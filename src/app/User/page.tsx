"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import userService from "@/services/user";
import toast from "react-hot-toast";
import { UserUpdateDto } from "@/utils/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";

const UsersPage = () => {
  const [users, setUsers] = useState<UserUpdateDto[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserUpdateDto[]>([]);
  const [filterStatus, setFilterStatus] = useState<"active" | "inactive">(
    "active"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
        filterUsers(data, filterStatus, searchQuery);
      } catch (error) {
        toast.error("Error fetching users.");
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [filterStatus]);

  const filterUsers = (
    users: UserUpdateDto[],
    status: "active" | "inactive",
    query: string
  ) => {
    const filtered = users.filter(
      (user) =>
        (status === "active" ? user.isActive : !user.isActive) &&
        `${user.firstName} ${user.lastName} ${user.email}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterUsers(users, filterStatus, query);
  };

  const handleStatusChange = async (userId: string, newStatus: number) => {
    try {
      await userService.updateUser(userId, { isActive: newStatus });
      toast.success("User status updated successfully.");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: newStatus } : user
        )
      );
      filterUsers(users, filterStatus, searchQuery);
    } catch (error) {
      toast.error("Error updating user status.");
      console.error("Error updating user status:", error);
    }
  };

  const isAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role") === "admin";
    }
    return false;
  };

  if (!isClient) return null;

  return (
    <div>
      <Header>
        <div className="hidden sm:flex mr-5">
          <Link className="mr-5 mb-1" href="/myHomePage">
            Home
          </Link>
          {isAdmin() && (
            <>
              <Link className="mr-5 mb-1" href="/categoryPageAdmin">
                Category Management
              </Link>
              <Link className="mr-5 mb-1" href="/productPageAdmin">
                Product Management
              </Link>
              <Link className="mr-5 mb-1" href={`/order`}>
                Order
              </Link>
            </>
          )}
        </div>

        <div className="sm:hidden flex items-center mr-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <RxHamburgerMenu className="text-3xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto bg-white shadow-lg z-50">
              <div className="p-2 flex flex-col">
                <Link href="/myHomePage" className="mb-2">
                  Home
                </Link>
                {isAdmin() && (
                  <>
                    <Link href="/categoryPageAdmin" className="mb-2">
                      Category Management
                    </Link>
                    <Link href="/productPageAdmin" className="mb-2">
                      Product Management
                    </Link>
                    <Link className="mr-5 mb-1" href={`/order`}>
                      Order
                    </Link>
                  </>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Header>

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">User Management</h2>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users by name or email"
            className="p-2 border rounded w-full max-w-md"
          />
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              filterStatus === "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              filterStatus === "inactive"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterStatus("inactive")}
          >
            Inactive
          </button>
        </div>

        <div className="space-y-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-6 bg-white border rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="px-4 py-2 bg-gray-300 text-black rounded">
                      Change Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-white shadow-lg">
                    <button
                      onClick={() => handleStatusChange(user.id!, 1)}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleStatusChange(user.id!, 0)}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                    >
                      Deactivate
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">City: {user.city}</p>
              <p className="text-gray-700">Postal Code: {user.postaleCode}</p>
              <p className="text-gray-700">
                Status: {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          ))}
        </div>
      </div>

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

export default UsersPage;
