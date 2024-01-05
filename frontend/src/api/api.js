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
    console.error("Error al obtener los usuarios:", error);
    return []; // También devuelve un arreglo vacío en caso de error
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/usuarios/id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(
      `${apiConfig.baseURL}/usuarios/update/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
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

const getBusiness = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/business`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateBusiness = async (id, businessData) => {
  try {
    const response = await axios.put(
      `${apiConfig.baseURL}/business/update/${id}`,
      businessData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendRecoveryCode = async (email) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/usuarios/send-recovery-code`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const verifyRecoveryCode = async (email, code) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/usuarios/verify-recovery-code`,
      {
        email,
        code,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (email, newPassword) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/usuarios/change-password`,
      {
        email,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (id_usuario, newPassword) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/usuarios/update-password/${id_usuario}`,
      {
        contrasena: newPassword,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getUsers,
  getCredits,
  login,
  getCredit,
  addCredit,
  getBusiness,
  updateBusiness,
  sendRecoveryCode,
  verifyRecoveryCode,
  changePassword,
  updatePassword,
  updateUser,
  getUserById,
};
