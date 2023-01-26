import { put, fork, takeLatest, all } from 'redux-saga/effects';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { getUserLocationRequest, getUserForegroundLocationSuccess, getUserForegroundLocationFailure } from '../actions';

function* getUserLocation() {
    const foregroundPermission = yield Location.requestForegroundPermissionsAsync();
            
    if (foregroundPermission.status !== 'granted') {
        yield put(getUserForegroundLocationFailure());
    } else {
        const { coords } = yield Location.getCurrentPositionAsync({});
        yield put(getUserForegroundLocationSuccess(coords));

        const backgroundPermission = yield Location.requestBackgroundPermissionsAsync();
        console.info(backgroundPermission.status)

        // if (backgroundPermission.status === 'granted') 
    }

   
    // if (backgroundPermission.status !== 'granted') return false;
}

function* actionsSaga() {
    yield takeLatest(getUserLocationRequest, getUserLocation);
}

export default function* saga() {
    yield all([
        fork(actionsSaga)
    ]);
}
