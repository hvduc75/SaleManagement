import axios from '../utils/axiosCustomize';

const getAllProductsWithDeal = () => {
    return axios.get('/api/v1/product/getAllWithDeal');
};

const getAllProductsWithCategory = (page, limit, categoryId) => {
    return axios.get(`/api/v1/product/read?page=${page}&limit=${limit}&categoryId=${categoryId}`);
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

const putUpdateProduct = (id, name, price, sale, quantity, image, background, categoryId) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('price', price);
    data.append('sale', sale);
    data.append('quantity', quantity);
    data.append('background', background);
    data.append('image', image);
    data.append("categoryId", categoryId)
    return axios.put('/api/v1/product/update', data);
};

const deleteProduct = (id) => {
    return axios.delete('/api/v1/product/delete', { data: { id: id } });
};

export {
    postCreateNewProduct,
    getAllProductsWithDeal,
    putUpdateProduct,
    deleteProduct,
    getAllProductsWithCategory,
};
