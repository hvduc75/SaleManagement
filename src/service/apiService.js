import axios from '../utils/axiosCustomize';

const getAllUsers = () => {
    return axios.get('/api/v1/get-all-user');
};

const getUserWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/get-all-user?page=${page}&limit=${limit}`);
};

const postCreateNewUser = (email, password, username, phone, address, groupId, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('phone', phone);
    data.append('address', address);
    data.append('image', image);
    data.append('groupId', groupId);
    return axios.post('/api/v1/create-user', data);
};

const putUpdateUser = (id, username, address, groupId, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('address', address);
    data.append('image', image);
    data.append('groupId', groupId);
    return axios.put('/api/v1/update-user', data);
};

const deleteUser = (id) => {
    return axios.delete("/api/v1/delete-user", {data: {id: id}})
};

export { postCreateNewUser, getAllUsers, getUserWithPaginate, putUpdateUser, deleteUser };
