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

function* createAccount({ payload }) {    
    try {
        const response = yield call(accountApi.post, '/create', transformFormData(payload.params), MULTIPART_SETTINGS);
        const { data, success, message } = response.data;

        if (success) {
            yield put(createAccountSuccess(data.account));
            yield payload.successCallback && payload.successCallback();
        } else {
            yield payload.errorCallback && payload.errorCallback();
        }

    } catch(error) {
        payload.errorCallback && payload.errorCallback();
    }
};

function* updateAccount({ payload }) {    
    try {
        const { id, token } = yield select(state => state.account);
        const response = yield call(accountApi.post, '/edit', transformFormData({ ...payload.params, token, accountId: id }), MULTIPART_SETTINGS);
        const { data, success, message } = response.data;

        if (success) {
            yield put(updateAccountSuccess(data.account));
            yield payload.successCallback && payload.successCallback();
        } else {
            yield payload.errorCallback && payload.errorCallback();
        }

    } catch(error) {
        payload.errorCallback && payload.errorCallback();
    }
};

function* changePassword({ payload }) {    
    try {
        const { id, token } = yield select(state => state.account);
        const response = yield call(accountApi.post, '/change-password', transformFormData({ ...payload.params, token, accountId: id }), MULTIPART_SETTINGS);
        const { data, success, message } = response.data;

        if (success) {
            yield put(changePasswordSuccess(data.account));
            yield payload.successCallback && payload.successCallback();
        } else {
            yield payload.errorCallback && payload.errorCallback();
        }

    } catch(error) {
        payload.errorCallback && payload.errorCallback();
    }
};

function* forgottenPassword({ payload }) {    
    try {
        const { id, token } = yield select(state => state.account);
        const response = yield call(accountApi.post, '/forgotten-password', transformFormData({ ...payload.params, token, accountId: id }), MULTIPART_SETTINGS);
        const { data, success, message } = response.data;

        if (success) {
            yield payload.successCallback && payload.successCallback();
        } else {
            yield payload.errorCallback && payload.errorCallback();
        }

    } catch(error) {
        payload.errorCallback && payload.errorCallback();
    }
};


function* login({ payload }) {    
    try {
        const response = yield call(accountApi.post, '/login', transformFormData(payload.params), MULTIPART_SETTINGS);
        const { data, success, message } = response.data;

        if (success) {
            yield put(loginSuccess(data.account));
            yield payload.successCallback && payload.successCallback();
        } else {
            yield payload.errorCallback && payload.errorCallback();
        }
    } catch(error) {
        payload.errorCallback && payload.errorCallback();
    }
};


function* logout() {
    const { id, token } = yield select(state => state.account);
    try {
        yield call(accountApi.post, '/logout', { token, accountId: id });
        yield put(logoutSuccess());

    } catch(error) {
        console.log(error);
    }
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
