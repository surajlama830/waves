import axios from 'axios';

import{
    ADD_GUITAR_STRAP
}
from '../types';

import { GUITAR_STRAP_SERVER }from '../../../Components/utils/misc';

export function addGuitarStrap(dataToSubmit){
    const request = axios.post(`${GUITAR_STRAP_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_STRAP,
        payload:request
    }
}
