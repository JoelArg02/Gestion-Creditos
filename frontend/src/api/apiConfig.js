import axios from "axios";

const apiConfig = {
    baseURL: "http://localhost:5200/api", // Cambia la URL base según tu configuración
  };
  
  export default apiConfig;


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
