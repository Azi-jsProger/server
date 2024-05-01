import $api from "../http"
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/responce/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/login", {email, password})
    } static async registration(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/registration", {email, password, name})
    } static async logout(): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/logout")
    }
}