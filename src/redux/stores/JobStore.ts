import { Job } from "../../models/Job";
import { IAppState } from "../configureStore";

const defaultJob: () => Job = () => ({
    title: "Senior software engineer",
    company: "Florin SRL",
    featured: true,
    companyImage: "https://assetstorev1-prd-cdn.unity3d.com/key-image/a6a520a3-bb2a-4433-9643-a157d069247c.jpg",
    postedOn: new Date(),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    tags: [
        "C#",
        "Java",
        "Javascript"
    ],
    likes: Math.floor(Math.random() * 1000),
    loading: false,
    liked:  Math.floor(Math.random() * 10) > 5,
    location: "Romania"
});
 
const RECEIVE = "JOB_STORE_RECEIVE";
const RETRIVE = "JOB_STORE_RETRIVE";

export type JobStoreType = {
    jobs: Job[]
}

const initialState = {
    jobs: [defaultJob()]
} as JobStoreType;

const actionCreators = {
    loadMoreJobs: () => (dispatch, getState: () => IAppState) => {
        dispatch({type: RECEIVE})

        setTimeout(() => {
            dispatch({type: RETRIVE})
        }, 3000)
    }
}

const reducer = (state: JobStoreType, action) => {
    state = state || initialState;

    if(action.type == RECEIVE) {
        return {
            jobs: [
                ...state.jobs,
                {loading: true}
            ]
        }
    }

    if(action.type == RETRIVE) {
        return {
            jobs: [...state.jobs.filter((j) => !j.loading), 
                ...[defaultJob(), defaultJob()]
            ]
        }
    }

    return state;
}

export default {
    reducer,
    actionCreators,
    initialState
}