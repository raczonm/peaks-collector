import { LOGOUT_SUCCESS } from '../../actions/actionTypes';

const initialState = []

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};