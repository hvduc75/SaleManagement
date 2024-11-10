import axios from '../utils/axiosCustomize';

const createNewOrder = (data) => {
    return axios.post(`/api/v1/order/create`, data);
};

const getOrdersByUserId = (userId) => {
    return axios.get(`/api/v1/order/getOrdersByUserId?userId=${userId}`);
};

const getAllOrderPaginate = (page, limit, condition, date) => {
    return axios.get(
        `/api/v1/order/getAllOrderPaginate?page=${page}&limit=${limit}&condition=${condition}&date=${date}`,
    );
};

const confirmOrder = (id) => {
    return axios.put(`/api/v1/order/confirmOrder`, { id });
};

const getAllOrderInDay = () => {
    return axios.get('/api/v1/order/getAllOrderInDay');
};

const getWeeklyRevenue = (date) => {
    return axios.get(`/api/v1/order/getAllOrderInWeek?startDate=${date}`);
};

export { createNewOrder, getOrdersByUserId, getAllOrderPaginate, confirmOrder, getAllOrderInDay, getWeeklyRevenue };
