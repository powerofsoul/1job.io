import JobStore, { JobStoreType } from "./stores/JobStore";
import { applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

export interface IAppState {
    jobs: JobStoreType
}

const initialState: IAppState = {
    jobs: JobStore.initialState
}

const reducers = {
    jobs: JobStore.reducer
}

const rootReducer = combineReducers({ ...reducers });

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    const store = createStore(
        persistedReducer,
        initialState,
        compose(applyMiddleware(thunk))
    )
    const persistor = persistStore(store);

    return { store, persistor };
}