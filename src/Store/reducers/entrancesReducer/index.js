import { LOGOUT_SUCCESS, LOGIN_SUCCESS, ADD_ENTRANCE_SUCCESS, EDIT_ENTRANCE_SUCCESS, REMOVE_ENTRANCE_SUCCESS } from '../../actions/actionTypes';

const initialState = []

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case LOGOUT_SUCCESS:
            return initialState;
        case LOGIN_SUCCESS:
            return payload.account.wishlist;
        case ADD_ENTRANCE_SUCCESS:
        case EDIT_ENTRANCE_SUCCESS:
        case REMOVE_ENTRANCE_SUCCESS:
            return payload;
        default:
            return state;
    }
};