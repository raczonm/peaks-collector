import { LOGOUT_SUCCESS, LOGIN_SUCCESS, TOGGLE_WISHLIST_ITEM_SUCCESS } from '../../actions/actionTypes';

const initialState = []

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case LOGOUT_SUCCESS:
            return initialState;
        case LOGIN_SUCCESS:
            return payload.account.wishlist;
        case TOGGLE_WISHLIST_ITEM_SUCCESS:
            return payload;
        default:
            return state;
    }
};