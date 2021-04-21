import axios from 'axios';

import { ADD_GUITAR_BAG, GET_GUITAR_BAG, GET_GUITAR_BAG_DETAIL,UPDATE_GUITAR_BAG_DATA} from '../types';

import { GUITAR_BAG_SERVER } from '../../../Components/utils/misc';

export function addGuitarBag(dataToSubmit) {
	const request = axios.post(`${GUITAR_BAG_SERVER}/item`, dataToSubmit).then((res) => res.data);
	return {
		type: ADD_GUITAR_BAG,
		payload: request
	};
}
export async function getGuitarBag(skip, limit, previousState = []) {
	const data ={
		limit,
        skip
	}
	const request = await axios.get(`${GUITAR_BAG_SERVER}/items?sortBy=createdAt&order=desc&limit=${limit}&skip=${skip}`)
	.then((res) => {
		let newState = [
			...previousState,
			...res.data.docs
		];
		return {
			size:res.data.size,
			docs:newState
		}
	}
	);
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

export function updateGuitarBagData(dataToSubmit, id){
	const request = axios.post(`${GUITAR_BAG_SERVER}/update_accessories_data`,{dataToSubmit,id})
					.then(res=>res.data);
	return{
		type:UPDATE_GUITAR_BAG_DATA,
		payload:request
	}
}