import axios from "axios";
import apiConfig from "./apiConfig";

const getUsers = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/usuarios`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getUsers };

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
