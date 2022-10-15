import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}


export const logout = () => dispatch => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
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
    } else {
        const expirationTime = new Date(localStorage.getItem("expirationTime"));
        if (expirationTime <= new Date()) {
            //logout
            dispatch(logout());
        } else {
            const userId = localStorage.getItem("userId");
            dispatch(authSuccess(token, userId));
        }
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
            returnSecureToken: true,
        }
        let authUrl = null;
        if (mode === "Sign Up") {
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        } else {
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }
        const API_KEY = "AIzaSyCyj30Of88GL3hOnoUom55JNtVpM_eMMiE";
        axios.post(authUrl + API_KEY, authData)
            .then(response => {
                dispatch(authLoading(false));
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("expirationTime", expirationTime)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(errors => {
                dispatch(authLoading(false));
                dispatch(authFailed(errors.response.data.error.message));
            });
    }
}