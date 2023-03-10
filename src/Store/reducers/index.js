import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import mapLocationReducer from './mapLocationReducer';
import entrancesReducer from './entrancesReducer';
import wishlistReducer from './wishlistReducer';
import mainMapReducer from './mainMapReducer';
import searchReducer from './searchReducer';
import currentActivityReducer from './currentActivityReducer';
import peaksReducer from './peaksReducer';

export default combineReducers({
    account: accountReducer,
    mapLocation: mapLocationReducer,
    entrances: entrancesReducer,
    peaks: peaksReducer,
    wishlist: wishlistReducer,
    mainMap: mainMapReducer,
    search: searchReducer,
    currentActivity: currentActivityReducer
});