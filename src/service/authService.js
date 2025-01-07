import axios from "../utils/axiosCustomize"

const loginUser = (valueLogin, password) => {
    return axios.post("/api/v1/auth/login", {valueLogin, password})
}

const getAccount = () => {
    return axios.get("/api/v1/account")
}

const checkTokenLogin = (userId, tokenLogin) => {
    return axios.get(`/checkTokenLogin?userId=${userId}&tokenLogin=${tokenLogin}`)
}

const registerNewUser = (userData) => {
    return axios.post("/api/v1/auth/register", userData)
}

const logout = () => {
    return axios.post("/api/v1/auth/logout")
}

export {
    loginUser, registerNewUser, logout, getAccount, checkTokenLogin
}