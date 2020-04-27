import { Job } from "../../../models/JobModel";
import { IAppState } from "../configureStore";
import { get } from "../../Utils";
 
const RETRIVE = "JOB_STORE_RETRIVE";
const RELOAD  = "JOB_STORE_RELOAD";

export type JobStoreType = {
    jobs: Job[]
}

const initialState = {
    jobs: []
} as JobStoreType;

const actionCreators = {
    loadMoreJobs: () => async (dispatch) => {
        const jobs = await get<Job[]>("/api/jobs");
        dispatch({type: RETRIVE, jobs})
    },
    reloadAllJobs: () => (dispatch) => {
        dispatch({type: RELOAD})
    }
}

const reducer = (state: JobStoreType, action) => {
    state = state || initialState;

    if(action.type == RETRIVE) {
        return {
            jobs: [...state.jobs.filter((j) => !j.loading), 
                ...action.jobs
            ]
        }
    }

    if(action.type == RELOAD) {
        return {
            jobs: []
        }
    }

    return state;
}

export default {
    reducer,
    actionCreators,
    initialState
}