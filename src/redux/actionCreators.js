import * as actionTypes from "./actionTypes";
import axios from "axios";
import { API } from "../config";

export const addIngredient = igtype => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype
    }
}

export const removeIngredient = igtype => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype
    }
}

export const updatePurchaseAble = () => {
    return {
        type: actionTypes.UPDATE_PURCHASEABLE
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    }
}
export const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token) => dispatch => {
    axios.get(`${API}/order`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch(loadOrders(response.data));
        })
        .catch(error => {
            dispatch(orderLoadFailed());
        })

}

