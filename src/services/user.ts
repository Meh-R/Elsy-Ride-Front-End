import axios from "axios";
import { UserUpdateDto } from "@/utils/types";

const getAuthorizationHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : undefined;
  }
  return undefined;
};

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}user`,
  headers: {
    "content-type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const userService = {
  async getCurrentUser() {
    try {
      const response = await api.get("/details", {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  },

  async getAllUsers(page: number) {
    try {
      const response = await api.get(`/all/${page}`, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch all users:", error);
      throw error;
    }
  },

  async findUser(query: string) {
    try {
      const response = await api.get(`/find/${query}`, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to find user:", error);
      throw error;
    }
  },

  async updateUser(id: string, updateData: UserUpdateDto) {
    try {
      const response = await api.patch(`/update/${id}`, updateData, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  },

  async updateMyProfile(updateData: UserUpdateDto) {
    try {
      const response = await api.patch("/update", updateData, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update my profile:", error);
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const response = await api.delete(`/delete/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  },

  async deleteMyProfile() {
    try {
      const response = await api.delete("/delete", {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete my profile:", error);
      throw error;
    }
  },
};

export default userService;
