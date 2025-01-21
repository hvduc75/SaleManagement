import axios from '../utils/axiosCustomize';

const getProductDetail = (productId) => {
    return axios.get(`/api/v1/product_detail/read?productId=${productId}`);
};

const postCreateProductDetail = (description, contentMarkdown, productId, action, images) => {
    const data = new FormData();
    data.append('description', description);
    data.append('contentMarkdown', contentMarkdown);
    data.append('productId', productId);
    data.append('action', action);
    images.forEach((image) => {
        data.append('images', image.file); 
    });
    return axios.post('/api/v1/product_detail/create-or-update', data);
};

export { postCreateProductDetail, getProductDetail };
