import { applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import CurrentUserStore, { CurrentUserStoreType } from "./stores/CurrentUserStore";

export interface IAppState {
    currentUserStore: CurrentUserStoreType
}

const initialState: IAppState = {
    currentUserStore: CurrentUserStore.initialState
}

const reducers = {
    currentUserStore: CurrentUserStore.reducer
}

export default () => {
    const store = createStore(
        combineReducers({ ...reducers }),
        initialState,
        compose(applyMiddleware(thunk))
    )
 
    return store;
}