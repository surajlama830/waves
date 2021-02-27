import axios from 'axios';

import{
    ADD_GUITAR_STRING
}
from '../types';

import { GUITAR_STRING_SERVER }from './../../../Components/utils/misc';

export function addGuitarString(dataToSubmit){
    const request = axios.post(`${GUITAR_STRING_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_STRING,
        payload:request
    }
}
