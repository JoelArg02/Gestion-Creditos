// api.js
import axios from "axios";
import apiConfig from "./apiConfig";

const getUsers = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/usuarios`);
    // Accede a la propiedad 'usuarios' del objeto JSON
    if (response.data && Array.isArray(response.data.usuarios)) {
      return response.data.usuarios;
    } else {
      return []; // Devuelve un arreglo vacío si no hay usuarios o la estructura es incorrecta
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return []; // También devuelve un arreglo vacío en caso de error
  }
};

const getCredits = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/credit`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (usuario, contrasena) => {
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

const getCredit = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/credit/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addCredit = async (creditoData) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/credit/create`,
      creditoData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getUsers, getCredits, login, getCredit, addCredit };
