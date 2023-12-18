import axios from "axios";

const apiConfig = {
    baseURL: "http://10.40.18.162:5200/api", // Cambia la URL base según tu configuración
  };
  
  export default apiConfig;


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

export { getCredits };

const login = async (user) => {
  try {
    const response = await axios.post(`${apiConfig.baseURL}/usuarios/login`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login };
