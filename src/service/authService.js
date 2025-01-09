import axios from '../utils/axiosCustomize';

const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/auth/login', { valueLogin, password });
};

const getAccount = () => {
    return axios.get('/api/v1/account');
};

const checkTokenLogin = (userId, tokenLogin) => {
    return axios.get(`/checkTokenLogin?userId=${userId}&tokenLogin=${tokenLogin}`);
};

const registerNewUser = (userData) => {
    return axios.post('/api/v1/auth/register', userData);
};

const logout = () => {
    return axios.post('/api/v1/auth/logout');
};

const sendOtp = (email) => {
    return axios.post('/api/v1/auth/send-code', { email });
};

const resetPassword = (email, otp, password) => {
    return axios.post('/api/v1/auth/resetPassword', { email, otp, password });
};

export { loginUser, registerNewUser, logout, getAccount, checkTokenLogin, sendOtp, resetPassword };
