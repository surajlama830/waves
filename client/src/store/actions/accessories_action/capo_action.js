import axios from 'axios';

import{
    ADD_GUITAR_CAPO
}
from '../types';

import { GUITAR_CAPO_SERVER }from '../../../Components/utils/misc';

export function addGuitarCapo(dataToSubmit){
    const request = axios.post(`${GUITAR_CAPO_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_CAPO,
        payload:request
    }
}
