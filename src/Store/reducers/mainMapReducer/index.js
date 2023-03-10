import { LOGOUT_SUCCESS, GET_PEAKS_IDS_REQUEST, GET_PEAKS_IDS_SUCCESS, SET_ACTIVE_MAP_FILTERS } from '../../actions/actionTypes';

const initialState = {
    isLoading: false,
    peaksNearbyIds: [],
    activeFilters: {}
}

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PEAKS_IDS_REQUEST:
            if (payload.action !== 'getPeaksNearby') return state;

            return {
                ...state,
                isLoading: true
            };
        case GET_PEAKS_IDS_SUCCESS:
            if (payload.action !== 'getPeaksNearby') return state;

            return {
                isLoading: false,
                peaksNearbyIds: payload.peaksIds,
                activeFilters: state.activeFilters
            };
        case SET_ACTIVE_MAP_FILTERS:
            return { ...state, activeFilters: payload };
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};