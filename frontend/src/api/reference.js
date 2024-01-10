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

export { getReferenceById};