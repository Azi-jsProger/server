import React, {useState, useContext, useCallback} from 'react';
import { useNavigate} from "react-router-dom";

import cls from "./Login.module.scss";
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../../../0app/providers/StoreProvider/models/responce/AuthResponse";
import {API_URL} from "../../../5shered/api";

type TLoginProps = {
    setHandleModeAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setReg: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: TLoginProps) => {
    const { setHandleModeAuth, setReg } = props
    const { login } = useContext(AppContext)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement> | any) => {
        console.log('onSubmit')
        e.preventDefault();
            login?.(email, password, toggleReg)

    }, [email, password]);

    const toggleReg = () => {
        setReg(prev => !prev)
    }

    const HandleModeAuth = () => {
        setHandleModeAuth(prev => !prev)
    }

    return (
            <form className={cls.form} onSubmit={onSubmit}>
                <h5 className={cls.title}>Войти в аккаунт</h5>
                <div className={cls.boxInp}>
                    <input
                        onChange={onChangeEmail}
                        value={email}
                        type="email"
                        minLength={5}
                        placeholder="*Логин/почта"
                        id={"username"}
                    />
                    <input
                        onChange={onChangePassword}
                        value={password}
                        type="password"
                        minLength={5}
                        placeholder="*Пароль"
                    />
                </div>
                <div className={cls.forGotPassword}>
                    {/*<span>Забыли пароль??</span>*/}
                </div>
                <div className={cls.boxInp}>
                    <button className={cls.button} onClick={onSubmit}>Войти</button>
                </div>
                <div className={cls.boxZaRegistr}>
                    <span>Нет учетной записи??</span>
                    <span className={cls.registr} onClick={HandleModeAuth}>
                        Зарегистрироваться
                    </span>
                </div>
            </form>
    );
}

export default Login;
