import axios from "axios";
import apiConfig from "./apiConfig";

const getToken = () => localStorage.getItem('token');

const getReferenceById = async (id) => {
    try {
        const token = getToken(); 
        const response = await axios.get(`${apiConfig.baseURL}/referencia/id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createReference = async (referenceData) => {
    try {
        const token = getToken(); 
        const response = await axios.post(
            `${apiConfig.baseURL}/referencia/create`,
            referenceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getReferenceById, createReference };
