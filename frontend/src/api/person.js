import axios from "axios";
import apiConfig from "./apiConfig";

const getPersonById = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/persons/id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export { getPersonById };
