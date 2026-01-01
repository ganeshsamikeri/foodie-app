import api from "./axios";

export const placeOrder = (items) =>
  api.post("/api/orders/place", items);

export const getMyOrders = () =>
  api.get("/api/orders/my-orders");
