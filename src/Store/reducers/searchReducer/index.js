import { LOGOUT_SUCCESS, GET_PEAKS_IDS_REQUEST, GET_PEAKS_IDS_SUCCESS, SET_ACTIVE_SEARCH_FILTERS, CLEAR_SEARCH_RESULTS } from '../../actions/actionTypes';

const initialState = {
    isLoading: false,
    query: '',
    searchResults: [],
    activeFilters: {}
}

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PEAKS_IDS_REQUEST:
            if (payload.action !== 'getSearchResults') return state;

            return {
                ...state,
                query: payload.params.query,
                isLoading: true,
            };
        case GET_PEAKS_IDS_SUCCESS:
            if (payload.action !== 'getSearchResults' || !state.isLoading) return state;

            return {
                ...state,
                isLoading: false,
                searchResults: payload.peaksIds
            };
        case SET_ACTIVE_SEARCH_FILTERS:
            return {
                ...state,
                activeFilters: payload
            };
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                isLoading: false,
                query: payload,
                searchResults: []
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};