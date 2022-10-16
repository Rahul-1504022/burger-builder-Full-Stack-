import * as actionTypes from "./actionTypes";
import axios from "axios";
import { API } from "../config";


export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token
        }
    }
}


export const logout = () => dispatch => {
    localStorage.removeItem("token");
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const authLoading = (isLoading) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
        //logout
        dispatch(logout());
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg,
    }
}


export const auth = (email, password, mode) => {
    return dispatch => {
        dispatch(authLoading(true));
        const authData = {
            email: email,
            password: password,
            //returnSecureToken: true,
        }
        let authUrl = API;
        if (mode === "Sign Up") {
            axios.post(`${authUrl}/user`, authData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    dispatch(authLoading(false));
                    localStorage.setItem("token", response.data.token);
                    dispatch(authSuccess(response.data.token));
                })
                .catch(errors => {
                    dispatch(authLoading(false));
                    dispatch(authFailed(errors.response.data));
                });
        } else {
            axios.post(`${authUrl}/user/auth`, authData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    dispatch(authLoading(false));
                    localStorage.setItem("token", response.data.token);
                    dispatch(authSuccess(response.data.token));
                })
                .catch(errors => {
                    dispatch(authLoading(false));
                    dispatch(authFailed(errors.response.data));
                });
        }


    }
}
