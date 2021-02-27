import axios from 'axios';

import{
    ADD_GUITAR_TUNER
}
from '../types';

import { GUITAR_TUNER_SERVER }from '../../../Components/utils/misc';

export function addGuitarTuner(dataToSubmit){
    const request = axios.post(`${GUITAR_TUNER_SERVER}/item`, dataToSubmit)
                    .then(res=>res.data)
    return {
        type:ADD_GUITAR_TUNER,
        payload:request
    }
}
