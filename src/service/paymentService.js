import axios from '../utils/axiosCustomize';

const paymentWithVnPay = (amount , bankCode, language) => {
    return axios.post('/api/v1/payment/vnpay', {amount , bankCode, language});
};

const vnpay_return = (paymentParams) => {
    return axios.get("/api/v1/vnpay_return", {params: paymentParams})
}

export { paymentWithVnPay, vnpay_return };
