import axios from "axios";
import { Order } from "@/utils/types";

const getAuthorizationHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : undefined;
  }
  return undefined;
};

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}orders`,
  headers: {
    "content-type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const orderService = {
  async createOrder(data: Order) {
    try {
      const response = await api.post("/", data, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  },

  async getAllOrders() {
    try {
      const response = await api.get("/", {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      throw error;
    }
  },

  async getOrdersByCartId(cartId: string) {
    try {
      const response = await api.get(`/cart/${cartId}`, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders by cart ID:", error);
      throw error;
    }
  },

  async getOrdersByStatus(status: string) {
    try {
      const response = await api.get(`/status/${status}`, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders by status:", error);
      throw error;
    }
  },

  async getOrdersByCartIdAndStatus(cartId: string, status: string) {
    try {
      const response = await api.get(`/cart/${cartId}/status/${status}`, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders by cart ID and status:", error);
      throw error;
    }
  },

  async updateOrder(id: string, data: { status: string }) {
    try {
      const response = await api.patch(`/${id}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update order:", error);
      throw error;
    }
  },

  async deleteOrder(id: string) {
    try {
      const response = await api.delete(`/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete order:", error);
      throw error;
    }
  },
};

export default orderService;
