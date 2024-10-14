import axios from '../utils/axiosCustomize';

const getCartByUserId = (userId) => {
    return axios.get(`/api/v1/cart/read?userId=${userId}`);
};

const getProductsByCartId = (cartId) => {
    return axios.get(`/api/v1/cart/getAllProductByCartId?cartId=${cartId}`);
};

const addToCart = (cartId, productId, quantity) => {
    return axios.post(`/api/v1/cart/add-to-cart`, { cartId, productId, quantity });
};

export { getCartByUserId, addToCart, getProductsByCartId };
