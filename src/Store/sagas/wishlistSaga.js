import { call, put, fork, takeLatest, all, select } from 'redux-saga/effects';

import accountApi from '../../Api/AccountApi';
import {
    toggleWishlistItemRequest,
    toggleWishlistItemSuccess
} from '../actions';

function* toggleWishlistItem({ payload }) {    
    try {
        const wishlist = yield select(state => state.wishlist);
        // const { id, token } = yield select (state => state.account);
        // const endpoint = wishlist.includes(payload) ? 'remove_peak_from_wishlist' : 'add_peak_to_wishlist'; // TO CHANGE FOR wishlist/add wishlist/remove
        // const response = yield call(accountApi.post, `/${endpoint}`, { peakId: payload, token, accountId: id });
        // const { data, success, message } = response.data;

        const _newWishlist = wishlist.includes(payload) ? wishlist.filter(item => item !== payload) : [ ...wishlist, payload];
        yield put(toggleWishlistItemSuccess(_newWishlist));

        // console.log('responsedata', _newWishlist)

        // if (success) {
        //     yield put(toggleWishlistItemSuccess(_newWishlist));
        // } else {
        //     console.log('general_api_error', message) // TODO HANDLE GENERIC API ERROR 
        // }

    } catch(error) {
        console.log('general_api_error', error) // TODO HANDLE GENERIC API ERROR 
    }
};

function* actionsSaga() {
    yield takeLatest(toggleWishlistItemRequest, toggleWishlistItem);
}

export default function* saga() {
    yield all([
        fork(actionsSaga)
    ]);
}