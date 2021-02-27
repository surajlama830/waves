import axios from 'axios';

import{
    ADD_GUITAR_STAND
}
from '../types';

import { GUITAR_STAND_SERVER }from '../../../Components/utils/misc';

export function addGuitarStand(dataToSubmit){
    const request = axios.post(`${GUITAR_STAND_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_STAND,
        payload:request
    }
}
