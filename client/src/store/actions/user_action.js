import axios from 'axios';

import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART_USER,
	GET_CART_ITEMS,
	REMOVE_CART_ITEM_USER,
	UPDATE_DATA_USER,
	CLEAR_UPDATE_USER_DATA,
	ON_SUCCESS_BUY_USER
} from './types';
import { USER_SERVER, PRODUCT_SERVER, GUITAR_BAG_SERVER } from '../../Components/utils/misc';

export function registerUser(dataToSubmit) {
	const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then((response) => response.data);
	return {
		type: REGISTER_USER,
		payload: request
	};
}
export function loginUser(dataToSubmit) {
	const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then((response) => response.data);
	return {
		type: LOGIN_USER,
		payload: request
	};
}
export async function auth() {
	const request = await axios.get(`${USER_SERVER}/auth`).then((response) => response.data);
	console.log(request)
	return {
		type: AUTH_USER,
		payload: request
	};
}

export function logoutUser() {
	const request = axios.get(`${USER_SERVER}/logout`).then((response) => response.data);

	return {
		type: LOGOUT_USER,
		payload: request
	};
}

export function addToCart(_id, productType) {
	const data = {
		productType
	};
	const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`, data).then((res) => res.data);
	return {
		type: ADD_TO_CART_USER,
		payload: request
	};
}

export async function getCartItems(cartItems, userCart) {
	let guitar = [];
	let guitarBag = [];
	cartItems.forEach((item) => {
		if (item.type === 'Guitar') {
			guitar.push(item.id);
		} else if (item.type === 'guitarBag') {
			guitarBag.push(item.id);
		}
	});
	if (guitar.length > 0) {
		var requestGuitar = await axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${guitar}&type=array`).then((res) => {
			userCart.forEach((item) => {
				res.data.forEach((k, i) => {
					if (item.id === k._id) {
						res.data[i].quantity = item.quantity;
					}
				});
			});
			return res.data;
		});
	}

	if (guitarBag.length > 0) {
		var requestGuitarBag = await axios
			.get(`${GUITAR_BAG_SERVER}/item_by_id?id=${guitarBag}&type=array`)
			.then((res) => {
				userCart.forEach((item) => {
					res.data.forEach((k, i) => {
						if (item.id === k._id) {
							res.data[i].quantity = item.quantity;
						}
					});
				});
				return res.data;
			});
	}
	return {
		type: GET_CART_ITEMS,
		payload: [
			{ productName: 'guitarBag', Cart: guitarBag.length > 0 ? requestGuitarBag : null },
			{ productName: 'guitar', Cart: guitar.length > 0 ? requestGuitar : null }
		]
	};
}

export async function removeFromCart(id, type) {
	const request = await axios.get(`${USER_SERVER}/removeFromCart?_id=${id}&type=${type}`).then((res) => {
		res.data.cart.forEach((item) => {
			console.log('carts', item);
			console.log('cartdetail', res.data.cartDetail);

			res.data.cartDetail[0].Cart.forEach((k, i) => {
				if (item.id === k._id) {
					res.data.cartDetail[0].Cart[i].quantity = item.quantity;
				}
			});
			res.data.cartDetail[1].Cart.forEach((k, i) => {
				if (item.id === k._id) {
					res.data.cartDetail[1].Cart[i].quantity = item.quantity;
				}
			});
		});
		return res.data;
	});
	return {
		type: REMOVE_CART_ITEM_USER,
		payload: request
	};
}

export function updateUserData(dataToSubmit) {
	const request = axios.post(`${USER_SERVER}/update_profile`, dataToSubmit).then((res) => {
		return res.data;
	});
	return {
		type: UPDATE_DATA_USER,
		payload: request
	};
}

export function clearUpdateUser(){
	return{
		type:CLEAR_UPDATE_USER_DATA,
		payload:""
	}
}

export function onSuccessBuy(cartDetails,dataPayment){
	let data={
		cartDetail:cartDetails,
		paymentData:dataPayment
	}

	const request = axios.post(`${USER_SERVER}/successBuy`, data)
					.then(response=> response.data)
	return{
		type:ON_SUCCESS_BUY_USER,
		payload:request
	}
}
