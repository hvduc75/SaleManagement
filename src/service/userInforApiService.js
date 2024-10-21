import axios from '../utils/axiosCustomize';

const getUserInforDefault = (userId) => {
    return axios.get(`/api/v1/user_infor/read?userId=${userId}`);
};

const postCreateNewUserInfor = (province, district, commune, address, typeAddress, isDefault, userId) => {
    return axios.post('/api/v1/user_infor/create', {province, district, commune, address, typeAddress, isDefault, userId});
};

export { postCreateNewUserInfor, getUserInforDefault};
