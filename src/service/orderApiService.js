import axios from '../utils/axiosCustomize';

const createNewOrder = (data) => {
    return axios.post(`/api/v1/order/create`, data)
}

const getOrdersByUserId = (userId) => {
    return axios.get(`/api/v1/order/getOrdersByUserId?userId=${userId}`)
}

export {
    createNewOrder, getOrdersByUserId
}