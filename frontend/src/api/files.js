import axios from "axios";
import apiConfig from "./apiConfig";

const getFile = async (fileName) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseURL}/spaces/download/${fileName}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${apiConfig.baseURL}/spaces/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const viewFile = (fileName) => {
  const fileUrl = `${apiConfig.baseURL}/spaces/view-pdf/${fileName}`;
  window.open(fileUrl, '_blank');
};

export { getFile, uploadFile, viewFile };
