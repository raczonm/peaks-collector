import { LOGOUT_SUCCESS, GET_PEAKS_BY_IDS_REQUEST, GET_PEAKS_BY_IDS_SUCCESS } from '../../actions/actionTypes';
import { formatPeak } from '../../../Helpers';

const initialState = {
    isLoading: false,
    peaks: {},
    activeFilters: {}
}

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PEAKS_BY_IDS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case GET_PEAKS_BY_IDS_SUCCESS:
            const newPeaks = payload.peaks.reduce((acc, peak) => ({
                ...acc,
                [peak.id]: formatPeak(peak)
            }), {})
            return {
                isLoading: false,
                peaks: {
                    ...state.peaks,
                    ...newPeaks
                }
            };
        case LOGOUT_SUCCESS: // just for now TO BE REMOVED
            return initialState;
        default:
            return state;
    }
};