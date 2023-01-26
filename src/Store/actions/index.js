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
    GET_USER_FOREGROUND_LOCATION_FAILURE
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
