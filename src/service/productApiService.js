import axios from '../utils/axiosCustomize';

const getAllBanners = () => {
    return axios.get('/api/v1/get-all-banner');
};

const getAllProductsWithCategory = (page, limit, categoryId) => {
    return axios.get(`/api/v1/product/read?page=${page}&limit=${limit}&categoryId=${categoryId}`);
};

const getBannerWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/get-all-banner?page=${page}&limit=${limit}`);
};

const postCreateNewProduct = (products, id) => {
    const data = new FormData();
    products.forEach((product) => {
        data.append('name', product.name);
        data.append('price', product.price);
        data.append('sale', product.sale);
        data.append('image', product.image);
        data.append('background', product.background);
        data.append('quantity', product.quantity);
        data.append("categoryId", id)
    });
    return axios.post('/api/v1/product/create', data);
};

const putUpdateBanner = (id, name, status, description, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('description', description);
    data.append('image', image);
    data.append('status', status);
    return axios.put('/api/v1/update-banner', data);
};

const deleteBanner = (id) => {
    return axios.delete('/api/v1/delete-banner', { data: { id: id } });
};

export {
    postCreateNewProduct,
    getAllBanners,
    getBannerWithPaginate,
    putUpdateBanner,
    deleteBanner,
    getAllProductsWithCategory,
};
