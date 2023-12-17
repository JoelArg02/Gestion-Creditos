import axios from "axios";
import apiConfig from "./apiConfig";

const getCredits = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/credit`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (usuario, contrasena) => {
  try {
    const response = await axios.post(`${apiConfig.baseURL}/usuarios/login`, {
      usuario,
      contrasena,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export { getCredits };
