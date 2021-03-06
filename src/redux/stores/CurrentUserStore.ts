import { User } from "../../../models/User";
import { get } from "../../Utils";
import { Employer } from "../../../models/Employer";
import { Employee } from "../../../models/Employee";

export type CurrentUserStoreType = {
    user?: Employer | Employee;
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
        await get("/user/me").then(user => {
            dispatch({ type: SET_CURRENT_USER, user })
        }).catch(() => dispatch({ type: SET_CURRENT_USER, user: undefined }));
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