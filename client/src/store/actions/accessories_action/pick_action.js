import axios from 'axios';

import{
    ADD_GUITAR_PICK
}
from '../types';

import { GUITAR_PICKS_SERVER }from '../../../Components/utils/misc';

export function addGuitarPick(dataToSubmit){
    const request = axios.post(`${GUITAR_PICKS_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_PICK,
        payload:request
    }
}
