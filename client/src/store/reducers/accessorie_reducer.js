import{
    ADD_GUITAR_BAG,
    ADD_GUITAR_CABLE,
    ADD_GUITAR_CAPO,
    ADD_GUITAR_PICK,
    ADD_GUITAR_STAND,
    ADD_GUITAR_STRAP,
    ADD_GUITAR_STRING,
    ADD_GUITAR_TUNER,
    GET_GUITAR_BAG,
    GET_GUITAR_BAG_DETAIL
} from '../actions/types';

export const accessories = function(state={}, action){
    switch(action.type){
        case ADD_GUITAR_BAG:
            return {...state, addGuitarBag:action.payload}
        case GET_GUITAR_BAG:
            return {...state, getGuitarBag:action.payload, size:action.payload.size}    
        case GET_GUITAR_BAG_DETAIL:
            return {...state, prodDetail:action.payload}  

        case ADD_GUITAR_CABLE:
            return {...state, addGuitarCable:action.payload}

        case ADD_GUITAR_CAPO:
            return {...state, addGuitarCapo:action.payload}

        case ADD_GUITAR_PICK:
            return {...state, addGuitarPick:action.payload}

        case ADD_GUITAR_STAND:
            return {...state, addGuitarStand:action.payload}

        case ADD_GUITAR_STRAP:
            return {...state, addGuitarStrap:action.payload}

        case ADD_GUITAR_STRING:
            return {...state, addGuitarString:action.payload}

        case ADD_GUITAR_TUNER:
            return {...state, addGuitarTuner:action.payload}

        default:
            return state;
    }
}