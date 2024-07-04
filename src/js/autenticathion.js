import axios from 'axios';

const API_URL = 'https://www.prozonelogistic.site/api/v1/api/token/';

export const LoginFunc = async (username, password) => {
    const response = await axios.post(`${API_URL}`, { username, password });
    if (response.data.access) {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
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