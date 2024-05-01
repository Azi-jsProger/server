import {IUser} from "../../../../../4entities/user/IUser";

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser
}