import axios from 'axios';

import{
    ADD_GUITAR_CABLE
}
from '../types';

import { GUITAR_CABLE_SERVER }from '../../../Components/utils/misc';

export function addGuitarCable(dataToSubmit){
    const request = axios.post(`${GUITAR_CABLE_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_CABLE,
        payload:request
    }
}
