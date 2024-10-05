import axios from "../utils/axiosCustomize"

const loginUser = (valueLogin, password) => {
    return axios.post("/api/v1/login", {valueLogin, password})
}

const registerNewUser = (userData) => {
    return axios.post("/api/v1/register", userData)
}

export {
    loginUser, registerNewUser
}