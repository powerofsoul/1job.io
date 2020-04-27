import { User } from "../../../models/UserModel";
import { IAppState } from "../configureStore";
import { post, get } from "../../Utils";

export type CurrentUserStoreType = {
   user?: User;
}

const initialState = {
} as CurrentUserStoreType;

const SET_CURRENT_USER = "SET_CURRENT_USER";
const LOG_OUT_CURRENT_USER = "LOG_OUT_CURRENT_USER";

const actionCreators = {
   setCurrentUser: (user: User) => ({type: SET_CURRENT_USER, user}),
   logOut: () => async (dispatch) => {
        await get("/api/user/logout");
        
        dispatch({type: LOG_OUT_CURRENT_USER})
    }
}

const reducer = (state: CurrentUserStoreType, action) => {
    state = state || initialState;

    if(action.type == SET_CURRENT_USER) {
        return {
            ...state,
            user: action.user
        }
    }

    if(action.type == LOG_OUT_CURRENT_USER){
        return {}
    }

    return state;
}

export default {
    reducer,
    actionCreators,
    initialState
}