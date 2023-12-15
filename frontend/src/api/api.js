import axios from "axios";
import apiConfig from "./apiConfig";

const getCredits = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/creditos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getCredits };
