import { createActions } from 'redux-actions';

import {
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_REQUEST,
    UPDATE_ACCOUNT_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    FORGOTTEN_PASSWORD_REQUEST,
    FORGOTTEN_PASSWORD_SUCCESS,
    GET_USER_LOCATION_REQUEST,
    GET_USER_FOREGROUND_LOCATION_SUCCESS,
    GET_USER_FOREGROUND_LOCATION_FAILURE,
    TOGGLE_WISHLIST_ITEM_REQUEST,
    TOGGLE_WISHLIST_ITEM_SUCCESS,
    GET_PEAKS_IDS_REQUEST,
    GET_PEAKS_IDS_SUCCESS,
    GET_PEAKS_BY_IDS_REQUEST,
    GET_PEAKS_BY_IDS_SUCCESS,
    SET_ACTIVE_MAP_FILTERS,
    SET_ACTIVE_SEARCH_FILTERS,
    CLEAR_SEARCH_RESULTS,
    START_ACTIVITY,
    STOP_ACTIVITY,
    CANCEL_ACTIVITY,
    ADD_LOCATION_POINT,
    ADD_VISITED_PEAK,
    REMOVE_VISITED_PEAK,
    SAVE_ACTIVITY_REQUEST,
    SAVE_ACTIVITY_SUCCESS,
    ADD_ENTRANCE_REQUEST,
    ADD_ENTRANCE_SUCCESS,
    EDIT_ENTRANCE_REQUEST,
    EDIT_ENTRANCE_SUCCESS,
    REMOVE_ENTRANCE_REQUEST,
    REMOVE_ENTRANCE_SUCCESS
} from './actionTypes';


// ACCOUNT ACTIONS
export const {
    createAccountRequest,
    createAccountSuccess,
    updateAccountRequest,
    updateAccountSuccess,
    logoutRequest,
    logoutSuccess,
    loginRequest,
    loginSuccess,
    changePasswordRequest,
    changePasswordSuccess,
    forgottenPasswordRequest,
    forgottenPasswordSuccess
} = createActions({
    [CREATE_ACCOUNT_REQUEST]: null,
    [CREATE_ACCOUNT_SUCCESS]: null,
    [UPDATE_ACCOUNT_REQUEST]: null,
    [UPDATE_ACCOUNT_SUCCESS]: null,
    [LOGOUT_REQUEST]: null,
    [LOGOUT_SUCCESS]: null,
    [LOGIN_REQUEST]: null,
    [LOGIN_SUCCESS]: null,
    [CHANGE_PASSWORD_REQUEST]: null,
    [CHANGE_PASSWORD_SUCCESS]: null,
    [FORGOTTEN_PASSWORD_REQUEST]: null,
    [FORGOTTEN_PASSWORD_SUCCESS]: null
});

// MAP LOCATION ACTTIONS
export const {
    getUserLocationRequest,
    getUserForegroundLocationSuccess,
    getUserForegroundLocationFailure
} = createActions({
    [GET_USER_LOCATION_REQUEST]: null,
    [GET_USER_FOREGROUND_LOCATION_SUCCESS]: null,
    [GET_USER_FOREGROUND_LOCATION_FAILURE]: null
});

// WISHLIST ACTIONS
export const {
    toggleWishlistItemRequest,
    toggleWishlistItemSuccess
} = createActions({
    [TOGGLE_WISHLIST_ITEM_REQUEST]: null,
    [TOGGLE_WISHLIST_ITEM_SUCCESS]: null
});

// PEAKS ACTIONS
export const {
    getPeaksIdsRequest,
    getPeaksIdsSuccess,
    getPeaksByIdsRequest,
    getPeaksByIdsSuccess
} = createActions({
    [GET_PEAKS_IDS_REQUEST]: null,
    [GET_PEAKS_IDS_SUCCESS]: null,
    [GET_PEAKS_BY_IDS_REQUEST]: null,
    [GET_PEAKS_BY_IDS_SUCCESS]: null
});

// ENTRANCS ACTIONS
export const {
    addEntranceRequest,
    addEntranceSuccess,
    editEntranceRequest,
    editEntranceSuccess,
    removeEntranceRequest,
    removeEntranceSuccess
} = createActions({
    [ADD_ENTRANCE_REQUEST]: null,
    [ADD_ENTRANCE_SUCCESS]: null,
    [EDIT_ENTRANCE_REQUEST]: null,
    [EDIT_ENTRANCE_SUCCESS]: null,
    [REMOVE_ENTRANCE_REQUEST]: null,
    [REMOVE_ENTRANCE_SUCCESS]: null
})

// MAP ACTIONS
export const {
    setActiveMapFilters
} = createActions({
    [SET_ACTIVE_MAP_FILTERS]: null
});

// SEARCH ACTIONS
export const {
    setActiveSearchFilters,
    clearSearchResults
} = createActions({
    [SET_ACTIVE_SEARCH_FILTERS]: null,
    [CLEAR_SEARCH_RESULTS]: null
});

// ACTIVITIES ACTIONS
export const {
    startActivity,
    stopActivity,
    cancelActivity,
    addLocationPoint,
    addVisitedPeak,
    removeVisitedPeak,
    saveActivityRequest,
    saveActivitySuccess
} = createActions({
    [START_ACTIVITY]: null,
    [STOP_ACTIVITY]: null,
    [CANCEL_ACTIVITY]: null,
    [ADD_LOCATION_POINT]: null,
    [ADD_VISITED_PEAK]: null,
    [REMOVE_VISITED_PEAK]: null,
    [SAVE_ACTIVITY_REQUEST]: null,
    [SAVE_ACTIVITY_SUCCESS]: null
})