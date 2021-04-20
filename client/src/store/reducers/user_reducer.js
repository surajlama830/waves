import {
	AUTH_USER,
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
	ADD_TO_CART_USER,
	GET_CART_ITEMS,
	REMOVE_CART_ITEM_USER,
	UPDATE_DATA_USER,
	CLEAR_UPDATE_USER_DATA,
	ON_SUCCESS_BUY_USER
} from '../actions/types';

export const user = function(state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload };

		case REGISTER_USER:
			return { ...state, registerSuccess: action.payload };

		case AUTH_USER:
			return { ...state, userData: action.payload };

		case LOGOUT_USER:
			return { ...state };

		case ADD_TO_CART_USER:
			return {
				...state,
				userData: {
					...state.userData,
					cart: action.payload
				}
			};

		case GET_CART_ITEMS:
			return { ...state, cartDetail: action.payload };

		case REMOVE_CART_ITEM_USER:
			return {
				...state,
				cartDetail: action.payload.cartDetail,
				userData: {
					...state.userData,
					cart: action.payload.cart
				}
			};
		case UPDATE_DATA_USER:
			return { ...state, updateUser: action.payload };
        case CLEAR_UPDATE_USER_DATA:
            return {...state, updateUser:action.payload};

		case ON_SUCCESS_BUY_USER:
			return {...state, successBuy: action.payload.success,
				userData:{
					...state.userData,
					cart:action.payload.cart
				},
				cartDetail:action.payload.cartDetail
			}
		default:
			return state;
	}
};
