import axios from "axios";

const orderService = {
  getOrders: async () => {
    const response = await axios.get("/api/orders/my-orders");
    return response.data;
  },
};

export default orderService;
