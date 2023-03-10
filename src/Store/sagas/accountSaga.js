import { call, put, fork, takeLatest, all, select } from 'redux-saga/effects';

import accountApi, { MULTIPART_SETTINGS } from '../../Api/AccountApi';
import { transformFormData } from '../../Helpers'
import {
    createAccountRequest,
    createAccountSuccess,
    updateAccountRequest,
    updateAccountSuccess,
    changePasswordRequest,
    changePasswordSuccess,
    forgottenPasswordRequest,
    logoutRequest,
    logoutSuccess,
    loginRequest,
    loginSuccess
} from '../actions';

const GENERAL_API_ERROR_MESSAGE = 'GENERAL_API_ERROR_MESSAGE';

function* handleApiCall({ endpoint, successAction, successCallback, errorCallback, params, isMultipart = true }) {
    try {
        const _params = isMultipart ? transformFormData(params) : params;
        const _settings = isMultipart ? MULTIPART_SETTINGS : {};

        const response = yield call(accountApi.post, endpoint, _params, _settings);
        const { data, success, userMessage, log } = response.data;

        console.log(response.data);

        if (success) {
            yield successAction && put(successAction(data));
            yield successCallback && successCallback(userMessage);
        } else {
            yield errorCallback && errorCallback(userMessage);
        }
    } catch(error) {
        console.log('END ERROR', error)
        yield errorCallback && errorCallback(GENERAL_API_ERROR_MESSAGE);
    }
}

function* createAccount({ payload }) {    
    yield handleApiCall({
        ...payload,
        endpoint: '/create',
        successAction: createAccountSuccess,
    });
}

function* updateAccount({ payload }) {
    const { id, token } = yield select(state => state.account);

    yield handleApiCall({
        ...payload,
        endpoint: '/edit',
        successAction: updateAccountSuccess,
        params: { ...payload.params, token, accountId: id }
    });
}

function* changePassword({ payload }) {    
    const { id, token } = yield select(state => state.account);

    yield handleApiCall({
        ...payload,
        endpoint: '/change-password',
        successAction: changePasswordSuccess,
        params: { ...payload.params, token, accountId: id }
    });
};

function* forgottenPassword({ payload }) {    
    yield handleApiCall({
        ...payload,
        endpoint: '/forgotten-password'
    });
};

function* login({ payload }) {    
    yield handleApiCall({
        ...payload,
        endpoint: '/login',
        successAction: loginSuccess
    });
};


function* logout() {
    const { id, token } = yield select(state => state.account);

    yield handleApiCall({
        endpoint: '/logout',
        params: { token, accountId: id },
        successAction: logoutSuccess,
        isMultipart: false
    });
}

function* actionsSaga() {
    yield takeLatest(createAccountRequest, createAccount);
    yield takeLatest(updateAccountRequest, updateAccount);
    yield takeLatest(changePasswordRequest, changePassword);
    yield takeLatest(forgottenPasswordRequest, forgottenPassword);
    yield takeLatest(logoutRequest, logout);
    yield takeLatest(loginRequest, login);
}

export default function* saga() {
    yield all([
        fork(actionsSaga)
    ]);
}
