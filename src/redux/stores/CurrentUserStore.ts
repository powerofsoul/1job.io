import { IAppState } from "../configureStore";
import { post, get } from "../../Utils";
import { User } from "../../../models/User";

export type CurrentUserStoreType = {
    user?: User;
    loading: boolean;
}

const initialState = {
    loading: true
} as CurrentUserStoreType;

const SET_CURRENT_USER = "SET_CURRENT_USER";
const LOG_OUT_CURRENT_USER = "LOG_OUT_CURRENT_USER";

const actionCreators = {
    setCurrentUser: (user: User) => ({ type: SET_CURRENT_USER, user }),
    logOut: () => async (dispatch) => {
        await get("/user/logout");

        dispatch({ type: LOG_OUT_CURRENT_USER })
    },
    refreshCurrentUser: () => async (dispatch) => {
        const user = await get("/user/me");

        dispatch({type: SET_CURRENT_USER, user})
    } 
}

const reducer = (state: CurrentUserStoreType, action) => {
    state = state || initialState;

    if (action.type == SET_CURRENT_USER) {
        return {
            ...state,
            loading: false,
            user: action.user
        }
    }

    if (action.type == LOG_OUT_CURRENT_USER) {
        window.location.href = "/";
        return {}
    }

    return state;
}

export default {
    reducer,
    actionCreators,
    initialState
}