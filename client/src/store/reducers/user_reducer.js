import { AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../actions/types";

export const user =  function(state={}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return {...state, registerSuccess:action.payload} 
        case AUTH_USER:
            return  {...state, userData: action.payload}   
        case LOGOUT_USER:
            return {...state}
        default:
            return state;
    }
}
