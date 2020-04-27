import JobStore, { JobStoreType } from "./stores/JobsStore";
import { applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import CurrentUserStore, { CurrentUserStoreType } from "./stores/CurrentUserStore";

export interface IAppState {
    jobsStore: JobStoreType, 
    currentUserStore: CurrentUserStoreType
}

const initialState: IAppState = {
    jobsStore: JobStore.initialState, 
    currentUserStore: CurrentUserStore.initialState
}

const reducers = {
    jobsStore: JobStore.reducer,
    currentUserStore: CurrentUserStore.reducer
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