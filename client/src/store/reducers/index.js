import { combineReducers } from 'redux';
import { user } from './user_reducer';
import { products } from './product_reducer';
import { accessories } from './accessorie_reducer';

const rootReducer = combineReducers({
    user,
    products,
    accessories
});

export default rootReducer;
