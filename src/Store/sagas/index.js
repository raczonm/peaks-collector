import { all, fork } from 'redux-saga/effects';
import accountSaga from './accountSaga';
import mapLocationSaga from './mapLocationSaga';

export default function* saga() {
    yield all([
        fork(accountSaga),
        fork(mapLocationSaga)
    ]);
}