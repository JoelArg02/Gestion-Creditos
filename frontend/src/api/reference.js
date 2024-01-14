import axios from "axios";
import apiConfig from "./apiConfig";

const getReferenceById = async (id) => {
    try {
        const response = await axios.get(`${apiConfig.baseURL}/referencia/id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createReference = async (referenceData) => {
    try {
        const response = await axios.post(
            `${apiConfig.baseURL}/referencia/create`,
            referenceData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getReferenceById, createReference};