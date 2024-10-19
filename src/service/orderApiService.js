import axios from '../utils/axiosCustomize';

const createNewOrder = (data) => {
    return axios.post(`/api/v1/order/create`, data)
}

export {
    createNewOrder
}