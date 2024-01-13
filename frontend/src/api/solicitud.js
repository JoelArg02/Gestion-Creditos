import axios from 'axios';
import apiConfig from './apiConfig';


const getSolicitudById = async (idFormularioCliente) => {
    try {
        const response = await axios.get(`${apiConfig.baseURL}/solicitud/formulario/${idFormularioCliente}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const crearSolicitud = async (datosSolicitud) => {
    try {
        const response = await axios.post(`${apiConfig.baseURL}/solicitud/crear`, datosSolicitud);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Actualizar una solicitud existente
const actualizarSolicitud = async (id, datosActualizados) => {
    try {
        const response = await axios.put(`${apiConfig.baseURL}/solicitud/actualizar/${id}`, datosActualizados);
        
        return response.data;
    } catch (error) {
        throw error;
    }
};

const obtenerSolicitudesPendientes = async () => {
    try {
        const response = await axios.get(`${apiConfig.baseURL}/solicitud/pendientes`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
  

export { getSolicitudById, crearSolicitud, actualizarSolicitud, obtenerSolicitudesPendientes };
