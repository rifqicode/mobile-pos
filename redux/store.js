import { createStore } from "redux"
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'persistedReducer',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer)

let persistor = persistStore(store)

export {store, persistor}