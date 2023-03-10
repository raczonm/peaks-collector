import { call, put, fork, takeLatest, all, select } from 'redux-saga/effects';

import peaksApi from '../../Api/PeaksApi';

import {
    getPeaksIdsRequest,
    getPeaksIdsSuccess,
    getPeaksByIdsRequest,
    getPeaksByIdsSuccess
} from '../actions';


function* getPeaksIds({ payload }) {
    const { params, action } = payload;

    try {
        const response = yield call(peaksApi.post, '/get_peaks_ids', params);
        const { data, success, message } = response.data;

        if (success) {
            yield put(getPeaksByIdsRequest(data.peaks));
            yield put(getPeaksIdsSuccess({ peaksIds: data.peaks.map(peak => peak.peakId), action }));
        } else {
            console.log('general_api_error', message) // TODO HANDLE GENERIC API ERROR 
        }

    } catch(error) {
        console.log('general_api_error', error) // TODO HANDLE GENERIC API ERROR 
    }
}

function* getPeaksByIds({ payload }) {
    const { peaks } = yield select(state => state.peaks);

    const peaksToFetch = payload.reduce((acc, peak) => {
        return !!peaks[peak.peakId] ? acc : [ ...acc, peak.peakId ];
    }, []);

    console.log('peaksToFetch', peaksToFetch);

    if (!peaksToFetch.length) {
        yield put(getPeaksByIdsSuccess({ peaks: [] }));
    } else {
        try {
            const response = yield call(peaksApi.post, '/get_peaks', { peakIds: peaksToFetch });
            const { data, success, message } = response.data;

            if (success) {
                yield put(getPeaksByIdsSuccess({ peaks: data.peaks }));
            } else {
                console.log('general_api_error', message) // TODO HANDLE GENERIC API ERROR 
            }

        } catch(error) {
            console.log('general_api_error', error) // TODO HANDLE GENERIC API ERROR 
        }
    }
}

function* actionsSaga() {
    yield takeLatest(getPeaksIdsRequest, getPeaksIds);
    yield takeLatest(getPeaksByIdsRequest, getPeaksByIds);
}

export default function* saga() {
    yield all([
        fork(actionsSaga)
    ]);
}