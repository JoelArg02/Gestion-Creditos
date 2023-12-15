import axios from "axios";

const apiConfig = {
    baseURL: "http://192.168.68.107:5200/api", // Cambia la URL base según tu configuración
  };
  
  export default apiConfig;


const getCredits = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/creditos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getCredits };
