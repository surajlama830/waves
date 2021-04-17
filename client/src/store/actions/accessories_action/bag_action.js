import axios from 'axios';

import { ADD_GUITAR_BAG, GET_GUITAR_BAG, GET_GUITAR_BAG_DETAIL } from '../types';

import { GUITAR_BAG_SERVER } from '../../../Components/utils/misc';

export function addGuitarBag(dataToSubmit) {
	const request = axios.post(`${GUITAR_BAG_SERVER}/item`, dataToSubmit).then((res) => res.data);
	return {
		type: ADD_GUITAR_BAG,
		payload: request
	};
}
export function getGuitarBag() {
	const request = axios.get(`${GUITAR_BAG_SERVER}/items?sortBy=createdAt&order=desc&limit=6`).then((res) => res.data);
	return {
		type: GET_GUITAR_BAG,
		payload: request
	};
}
export function getGuitarDetail(id) {
	const request = axios.get(`${GUITAR_BAG_SERVER}/item_by_id?id=${id}&type=single`).then((res) => {
		return res.data[0];
	});
	return {
		type: GET_GUITAR_BAG_DETAIL,
		payload: request
	};
}
