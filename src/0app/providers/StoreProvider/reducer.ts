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

const resetRequestOneManga =  "resetRequestOneManga";
const resetSuccessOneManga =  "resetSuccessOneManga";
const resetFailureOneManga =  "resetFailureOneManga";

const addRequest = "addRequest";
const addSuccess = "addSuccess";
const addFailure = "addFailure";

const addCommentRequest = "addCommentRequest";
const addCommentSuccess = "addCommentSuccess";
const addCommentFailure = "addCommentFailure";

const registerUserRequest = "registerUserRequest"
const registerUserSuccess = "registerUserSuccess"
const registerUserFailure = "registerUserFailure"

const loginUserRequest = "loginUserRequest"
const loginUserSuccess = "loginUserSuccess"
const loginUserFailure = "loginUserFailure"

const logoutUserRequest = "logoutUserRequest"
const logoutUserSuccess = "logoutUserSuccess"
const logoutUserFailure = "logoutUserFailure"

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
        }case resetRequestOneManga: {
            return {
                ...state,
                loading: true
            };
        }
        case resetSuccessOneManga: {
            return {
                ...state,
                loading: false,
                oneManga: action.payload
            };
        }
        case resetFailureOneManga : {
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
        case registerUserRequest: {
            return {
                ...state,
                loading : true
            }
        }
        case registerUserSuccess: {
            return {
                ...state,
                isAuth: true,
                user: action.payload,
                loading : false
            }
        }
        case registerUserFailure: {
            return {
                ...state,
                error: action.payload,
                loading : false
            }
        }
        case loginUserRequest: {
            return {
                ...state,
                loading : true
            }
        }
        case loginUserSuccess: {
            return {
                ...state,
                isAuth: true,
                user: action.payload,
                loading : false
            }
        }
        case loginUserFailure: {
            return {
                ...state,
                error: action.payload,
                loading : false
            }
        }
        case logoutUserRequest: {
            return {
                ...state,
                loading : true
            }
        }
        case logoutUserSuccess: {
            return {
                ...state,
                isAuth: false,
                user: {},
                loading : false
            }
        }
        case logoutUserFailure: {
            return {
                ...state,
                error: action.payload,
                loading : false
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
