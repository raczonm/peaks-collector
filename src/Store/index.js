import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from './reducers';
import sagas from './sagas';

const initialState = {};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['mainMap', 'search']
}

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, initialState, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
