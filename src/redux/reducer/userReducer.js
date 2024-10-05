import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from '../action/types';

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: '',
    },
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email,
                },
                isAuthenticated: true,
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        // case USER_LOGOUT_SUCCESS:
        //   return {
        //     ...state, account: {
        //       access_token: "",
        //       refresh_token: "",
        //       username: "",
        //       image: "",
        //       role: "",
        //       email:""
        //     },
        //     isAuthenticated: false
        //   }
        default:
            return state;
    }
};

export default userReducer;
