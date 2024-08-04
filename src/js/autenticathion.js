import axios from 'axios';
import { APIBASE } from './urls';

const API_URL = `${APIBASE}v1/api/token/`;

export const LoginFunc = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}`, { username, password });
        
        // Verifica si el usuario es un conductor
        if (response.data.conductor) {
            // Limpiar el almacenamiento local
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
            
            // Redirigir a la página de inicio
            window.location.href = "/";
            return null;
        }

        // Guarda el token y la información del usuario si no es conductor
        if (response.data.access) {
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        // Manejo de errores adicional si es necesario
        throw error;
    }
};

export const Logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    window.location.href = "/";
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

{/* Register of sents */ }
const Api_Register = '#';
export const RegisterFunc = async (formData) => {
    const response = await axios.post(`${Api_Register}`, formData);
    return response.data;
};