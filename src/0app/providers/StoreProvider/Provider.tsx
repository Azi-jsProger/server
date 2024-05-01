import axios, {AxiosResponse} from "axios";
import React, { createContext, useCallback, useReducer, Dispatch } from 'react';

import initialState from "./initialState";
import reducer from "./reducer";
import {TManga} from "../../../5shered/types/MangaTypes";
import {API_URL} from "../../../5shered/api";
import {AuthResponse} from "./models/responce/AuthResponse";
import {AuthService} from "./service";

export type TContextProps = {
    dispatch?: Dispatch<{type: string, payload?:any}>;
    getData?: () => Promise<void>;
    getOneManga?: (id : string | number) => Promise<void>;
    resetOneManga?: () => Promise<void>;
    addComment?: (newComment: { author:string,comment:string,like:number,disLike:number },id: string | number, clearForm :() => void,oneManga: TManga) => Promise<void>
    login?: (email: string, password: string, toggleReg: () => void) => Promise<AxiosResponse<AuthResponse>> | any
    registration?: (name: string,email:string, password: string, toggleReg: () => void) => Promise<AxiosResponse<AuthResponse>> | any
    logout?: () => Promise<void> | any
    checkAuth?: () => void
}

export type TInitialState = {
    manga: TManga[];
    loading: boolean;
    error: any;
    isAuth:boolean;
    oneManga: TManga
    user: {
        email: string;
        password: string;
        img: string;
        favoriteMangas: number[]
    } | null;

}

type user = {
    token: string
}

export const AppContext = createContext<TInitialState & TContextProps>(initialState);

const Provider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getData = useCallback(async () => {
        try {
            dispatch({ type: "getRequest" });
            const { data } = await axios.get(`${API_URL}/manga`);
            console.log(data)
            dispatch({ type: "getSuccess", payload: data});
        } catch (error) {
            dispatch({ type: "getFailure", payload: error });
        }
    }, []);

    const getOneManga = (async (id: number | string) => {
        try {
            dispatch({ type: "getRequestOneManga" });
            const { data } = await axios.get(`${API_URL}/manga/${id}/`);
            dispatch({ type: "getSuccessOneManga", payload: data});
        } catch (error) {
            dispatch({ type: "getFailureOneManga", payload: error });
        }
    });

    const resetOneManga = (async () => {
        try {
            dispatch({ type: "resetRequestOneManga" });
            dispatch({ type: "resetSuccessOneManga", payload: {}});
        } catch (error) {
            dispatch({ type: "resetFailureOneManga", payload: error });
        }
    });

    const addComment = useCallback(async (newComment: { author:string,comment:string,like:number,disLike:number }, id: number | string, clearForm: () => void, oneManga:TManga) => {
        try {
            dispatch({ type: "addCommentRequest" });
            const { data: mangaItem } = await axios.get(`${API_URL}/manga/${id}`);
            mangaItem.comments.push(newComment);
            console.log(mangaItem, "addComment");
            await axios.put(`${API_URL}/manga/${id}`, mangaItem);
            clearForm();
            dispatch({ type: "addCommentSuccess", payload:newComment });
        } catch (error) {
            dispatch({ type: "addCommentFailure", payload: error });
        }
    }, []);

    const login = useCallback(async (email: string, password: string, toggleReg: () => void) => {
        try {
            dispatch({ type: "loginUserRequest" })
            const response = await AuthService.login(email, password)
            localStorage.setItem("token", response.data.accessToken)
            dispatch({ type: "loginUserSuccess" , payload: response.data.user })
            toggleReg()
        } catch (error) {
            dispatch({ type: "loginUserFailure" , payload: {error}})
        }
    }, []);

    const registration = useCallback(async (name: string,email: string, password: string, toggleReg: () => void) => {
        try {
            dispatch({ type: "registerUserRequest" })
            const response = await AuthService.registration(email, password, name)
            localStorage.setItem("token", response.data.accessToken)
            dispatch({ type: "registerUserSuccess" , payload: response.data.user })
            toggleReg()
        } catch (error) {
            dispatch({ type: "registerUserFailure" , payload: {error}})
        }
    }, []);

    const logout = useCallback(() => {
        try {
            dispatch({ type: "logoutUserRequest" })
            AuthService.logout?.()
            localStorage.removeItem("token")
            dispatch({ type: "logoutUserSuccess" })
        } catch (error) {
            dispatch({ type: "logoutUserFailure" , payload: {error}})
        }
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            dispatch({ type: "loginUserRequest" })
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem("token", response.data.accessToken)
            dispatch({ type: "loginUserSuccess" , payload: response.data.user })
        } catch (error) {
            dispatch({ type: "loginUserFailure" , payload: {error}})
        }
    }, []);

    const value: TInitialState & TContextProps = {
        manga: state.manga,
        loading: state.loading,
        error: state.error,
        isAuth: state.isAuth,
        oneManga: state.oneManga,
        user: state.user,
        addComment,
        getData,
        login,
        registration,
        logout,
        checkAuth,
        getOneManga,
        resetOneManga,
        dispatch
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
export default Provider;
