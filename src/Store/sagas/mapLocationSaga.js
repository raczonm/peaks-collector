import { put, fork, takeLatest, all, call, delay } from 'redux-saga/effects';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { getUserLocationRequest, getUserForegroundLocationSuccess, getUserForegroundLocationFailure, startActivity, stopActivity, addLocationPoint } from '../actions';

let tempActivityData = {
    active: false,
    location: { latitude: 49.658972206296006, longitude: 21.156828604318214, altitude: 300 }
};

function* getUserLocation() {
    const foregroundPermission = yield Location.requestForegroundPermissionsAsync();
            
    if (foregroundPermission.status !== 'granted') {
        yield put(getUserForegroundLocationFailure());
    } else {
        const { coords } = yield Location.getCurrentPositionAsync({});
        yield put(getUserForegroundLocationSuccess(coords));

        // const backgroundPermission = yield Location.requestBackgroundPermissionsAsync();
        // console.info(backgroundPermission.status)

        // if (backgroundPermission.status === 'granted') 
    }

   
    // if (backgroundPermission.status !== 'granted') return false;
}

// ------------------- TEMPORARY SOLUTION TO SIMULATE LOCATION
function* addLocation() {
    tempActivityData.location = {
        latitude: tempActivityData.location.latitude + (0.00006 + (Math.random() / 20000)) * ((Math.random() < 0.85) ? 1 : -1),
        longitude: tempActivityData.location.longitude + (0.00006 + (Math.random() / 20000)) * ((Math.random() < 0.85) ? 1 : -1),
        altitude: tempActivityData.location.altitude + ((Math.random() < 0.7) ? (Math.random() * 3) : (Math.random() * (-3)))
    }

    yield put(addLocationPoint({ ...tempActivityData.location, timestamp: Date.now() }))
}

function* startLocationLoop() {
    tempActivityData.active = true;
    while (tempActivityData.active) {
        yield addLocation();
        yield delay(1000);
      }
};

function stopLocationLoop() {
    tempActivityData.active = false;
}

// ------------------- TEMPORARY SOLUTION TO SIMULATE LOCATION -- END

function* actionsSaga() {
    yield takeLatest(getUserLocationRequest, getUserLocation);
    yield takeLatest(startActivity, startLocationLoop);
    yield takeLatest(stopActivity, stopLocationLoop);
}

export default function* saga() {
    yield all([
        fork(actionsSaga)
    ]);
}
