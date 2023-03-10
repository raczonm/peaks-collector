import { call, put, fork, takeLatest, all, select } from 'redux-saga/effects';

import accountApi, { MULTIPART_SETTINGS } from '../../Api/AccountApi';
import { transformFormData } from '../../Helpers';

import {
    addEntranceRequest,
    addEntranceSuccess,
    editEntranceRequest,
    editEntranceSuccess,
    removeEntranceRequest,
    removeEntranceSuccess
} from '../actions';


function* addEntrance({ payload: { params } }) {
    const { id, token } = yield select(state => state.account);

    const _params = transformFormData({ ...params, token, accountId: id });

    console.log('requestparams', params, _params)

    try {
        const response = yield call(accountApi.post, '/add_entrance', _params, MULTIPART_SETTINGS);
        const { data, success, message } = response.data;

        console.log(response.data);

        // if (success) {
        //     yield put(getPeaksByIdsRequest(data.peaks));
        //     yield put(getPeaksIdsSuccess({ peaksIds: data.peaks.map(peak => peak.peakId), action }));
        // } else {
        //     console.log('general_api_error', message) // TODO HANDLE GENERIC API ERROR 
        // }

    } catch(error) {
        console.log('general_api_error', error) // TODO HANDLE GENERIC API ERROR 
    }
}

function* editEntrance({ payload }) {
    const { params, action } = payload;
}

function* actionsSaga() {
    yield takeLatest(addEntranceRequest, addEntrance);
    yield takeLatest(editEntranceRequest, editEntrance);
}

export default function* saga() {
    yield all([
        fork(actionsSaga)
    ]);
}