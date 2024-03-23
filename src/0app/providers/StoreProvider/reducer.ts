import {TInitialState} from "./Provider";

type TAction = {
    type : string,
    payload ?: any
}

const getRequest = "getRequest";
const getSuccess = "getSuccess";
const getFailure = "getFailure";

const getRequestOneManga = "getRequestOneManga";
const getSuccessOneManga = "getSuccessOneManga";
const getFailureOneManga = "getFailureOneManga";

const addRequest = "addRequest";
const addSuccess = "addSuccess";
const addFailure = "addFailure";

const addCommentRequest = "addCommentRequest";
const addCommentSuccess = "addCommentSuccess";
const addCommentFailure = "addCommentFailure";

const registerUser = "registerUser"

export default (state : TInitialState & any, action : TAction) => {
    switch (action.type) {
        case getRequest: {
            return {
                ...state,
                loading: true
            };
        }
        case getSuccess: {
            return {
                ...state,
                loading: false,
                manga: action.payload
            };
        }
        case getFailure : {
            return {
                ...state,
                error : action.payload,
                loading : false
            };
        }
        case getRequestOneManga: {
            return {
                ...state,
                loading: true
            };
        }
        case getSuccessOneManga: {
            return {
                ...state,
                loading: false,
                oneManga: action.payload
            };
        }
        case getFailureOneManga : {
            return {
                ...state,
                error : action.payload,
                loading : false
            };
        }
        case addRequest: {
            return {
                ...state,
                loading: true
            };
        }
        case addSuccess: {
            return {
                ...state,
                loading: false,
                manga: [action.payload, ...state.manga]
            };
        }
        case addFailure : {
            return {
                ...state,
                error : action.payload,
                loading : false
            };
        }
        case registerUser: {
            return {
                ...state,
                user: action.payload
            }
        }
        case addCommentRequest : {
            return {
                ...state,
                loading: true
            }
        }
        case addCommentSuccess : {
            return {
                ...state,
                oneManga: {
                    ...state.oneManga,
                    comments: [...state.oneManga.comments, action.payload]
                }
            }
        }
        case addCommentFailure : {
            return {
                ...state,
                error : action.payload,
                loading : false
            };
        }
    }
};
