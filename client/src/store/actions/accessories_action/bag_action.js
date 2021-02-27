import axios from 'axios';

import{
    ADD_GUITAR_BAG
}
from '../types';

import { GUITAR_BAG_SERVER }from '../../../Components/utils/misc';

export function addGuitarBag(dataToSubmit){
    const request = axios.post(`${GUITAR_BAG_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_BAG,
        payload:request
    }
}
