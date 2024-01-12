import axios from "axios";
import apiConfig from "./apiConfig";

const emailContacto = async (email) => {
    try {
        const response = await axios.post(`${apiConfig.baseURL}/mail/send`, email);
        return response.data;
    } catch (error) {
        throw error;
    }
    };

    
export { emailContacto };
