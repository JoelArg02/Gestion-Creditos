import axios from "axios";
import apiConfig from "./apiConfig";

const getPersonById = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/person/id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPerson = async (personData) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/person/create`,
      personData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export { getPersonById, createPerson };
