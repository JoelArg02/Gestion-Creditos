import axios from "axios";
import apiConfig from "./apiConfig";

const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/usuarios/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createUser };
