import axios from "axios";

const API_URL = "https://f7a8c79a71aab280.mokky.dev";

export const fetchOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
