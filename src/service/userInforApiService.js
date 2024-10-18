import axios from '../utils/axiosCustomize';

const getAllUserInfor = (userId) => {
    return axios.get(`/api/v1/user_infor/read?userId=${userId}`);
};

// const getUserWithPaginate = (page, limit) => {
//     return axios.get(`/api/v1/get-all-user?page=${page}&limit=${limit}`);
// };

const postCreateNewUserInfor = (province, district, commune, address, typeAddress, isDefault, userId) => {
    return axios.post('/api/v1/user_infor/create', {province, district, commune, address, typeAddress, isDefault, userId});
};

// const putUpdateUser = (id, username, address, groupId, image) => {
//     const data = new FormData();
//     data.append('id', id);
//     data.append('username', username);
//     data.append('address', address);
//     data.append('image', image);
//     data.append('groupId', groupId);
//     return axios.put('/api/v1/update-user', data);
// };

// const deleteUser = (id) => {
//     return axios.delete("/api/v1/delete-user", {data: {id: id}})
// };

export { postCreateNewUserInfor, getAllUserInfor};
