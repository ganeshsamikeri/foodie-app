import api from "./axios";

// GET MY ORDERS (JWT REQUIRED)
export const getMyOrders = async () => {
  const response = await api.get("/api/orders");
  return response.data;
};
