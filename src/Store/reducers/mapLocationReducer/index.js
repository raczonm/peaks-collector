import {
    CREATE_ACCOUNT_SUCCESS,
    GET_USER_FOREGROUND_LOCATION_SUCCESS,
    GET_USER_FOREGROUND_LOCATION_FAILURE
} from '../../actions/actionTypes';

const initialState = {
    isCurrentPositionLoaded: false,
    isForegroundLocationEnabled: false,
    isForegroundLocationChecked: false,
    isBackgroundLocationEnabled: false,
    isBackgroundLocationChecked: false,
    defaultMapPosition: null,
    currentUserPosition: null
}

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case CREATE_ACCOUNT_SUCCESS:
            return { 
                ...state,
                defaultMapPosition: { 
                    latitude: payload.defaultMapPosition[0],
                    longitude: payload.defaultMapPosition[1]
                },
            };
        case GET_USER_FOREGROUND_LOCATION_FAILURE:
            return { 
                ...state,
                currentUserPosition: null,
                isCurrentPositionLoaded: false,
                isForegroundLocationEnabled: false,
                isForegroundLocationChecked: true
            };
        case GET_USER_FOREGROUND_LOCATION_SUCCESS:
            return {
                ...state,
                currentUserPosition: {
                    latitude: payload.latitude,
                    longitude: payload.longitude
                },
                isCurrentPositionLoaded: true,
                isForegroundLocationEnabled: true,
                isForegroundLocationChecked: true
            };
        default:
            return state;
    }
};