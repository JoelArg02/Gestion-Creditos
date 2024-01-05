import axios from "axios";
import apiConfig from "./apiConfig";

const getPago = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/pagos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getPago };
