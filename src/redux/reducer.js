import * as actionTypes from "./actionTypes"

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 }
    ],
    orders: [],
    orderLoading: true,
    orderErr: false,
    totalPrice: 80,
    purchaseable: true,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
}

const INGREDIENT_PRICE = {
    salad: 20,
    cheese: 40,
    meat: 90
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.ingredients];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    item.amount++;
                }
            }// end of for loop
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload]
            }

        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload && item.amount > 0) {
                    item.amount--;
                    if (state.totalPrice > 80) {
                        return {
                            ...state,
                            ingredients: ingredients,
                            totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload]
                        }
                    }
                }
            }//end of for loop
        // if (state.totalPrice > 80 ) {
        //     return {
        //         ...state,
        //         ingredients: ingredients,
        //         totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload]
        //     }
        // }
        // }else{
        //     return {
        //         ...state,
        //         ingredients: ingredients
        //     }
        // }

        case actionTypes.UPDATE_PURCHASEABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum = sum + element.amount;
            }, 0);
            return {
                ...state,
                purchaseable: sum > 0 ? false : true
            }

        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 }
                ],
                totalPrice: 80,
                purchaseable: true,
            }

        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false,
            }

        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                orderLoading: false,
            }

        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                authFailedMsg: null,
                token: null,
                userId: null,

            }

        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }

        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            }

        default:
            return state;
    }
}