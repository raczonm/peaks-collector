import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import mapLocationReducer from './mapLocationReducer';
import entrancesReducer from './entrancesReducer';
import wishlistReducer from './wishlistReducer';


export default combineReducers({
    account: accountReducer,
    mapLocation: mapLocationReducer,
    entrances: entrancesReducer,
    wishlist: wishlistReducer
});