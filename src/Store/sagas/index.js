import { all, fork } from 'redux-saga/effects';
import accountSaga from './accountSaga';
import entrancesSaga from './entrancesSaga';
import wishlistSaga from './wishlistSaga';
import peaksSaga from './peaksSaga';
import mapLocationSaga from './mapLocationSaga';

export default function* saga() {
    yield all([
        fork(accountSaga),
        fork(entrancesSaga),
        fork(wishlistSaga),
        fork(peaksSaga),
        fork(mapLocationSaga)
    ]);
}