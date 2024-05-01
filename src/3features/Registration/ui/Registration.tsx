import React, {useCallback, useContext, useState} from 'react';
import cls from "./Registration.module.scss";
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";

type TRegistrationProps = {
    setHandleModeAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setReg: React.Dispatch<React.SetStateAction<boolean>>;
}

const Registration = (props: TRegistrationProps) => {
    const { registration } = useContext(AppContext)
    const { setHandleModeAuth, setReg } = props
    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
        passwordRepetition:'',
        name: '',
    });

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement> | any) => {
        console.log('onSubmit')
        e.preventDefault();
        registration?.(inputValue.name,inputValue.email, inputValue.password, toggleReg)
    }, [inputValue]);

    const toggleReg = () => {
        setReg(prev => !prev)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const id = e.currentTarget.id;
        setInputValue(prev => ({...prev, [id]: value}));};

    const HandleModeAuth = () => {
        setHandleModeAuth(prev => !prev)
    }

    return (
        <form className={cls.form} onSubmit={onSubmit}>
            <h5 className={cls.title}>Зарегистрировать аккаунт</h5>
            <div className={cls.boxInp}>
                <input
                    placeholder="*Никнейм" value={inputValue.name}
                    className={cls.input} onChange={handleChange}
                    id="name"
                />
                <input
                    placeholder="*Почта" value={inputValue.email}
                    className={cls.input} onChange={handleChange}
                    id="email" type={"Email"}
                />
                <input
                    placeholder="*Пороль" value={inputValue.password}
                    className={cls.input} onChange={handleChange}
                    id="password" type="password"
                />
                <input
                    placeholder="*Пороль еще раз" value={inputValue.passwordRepetition}
                    className={cls.input} onChange={handleChange}
                    id="passwordRepetition" type="password"
                />
            </div>
            <div className={cls.boxSoglashenie}>
                <span className={cls.soglashenie}>
                    Регистрируясь на сайте, вы соглашаетесь с Пользовательским
                    соглашением и подписываетесь на рассылку
                </span>
            </div>
            <div>
                <button className={cls.button} onClick={onSubmit}>РЕГИСТРАЦИЯ</button>
            </div>
            <div className={cls.boxZaRegistr}>
                <span>Уже есть аккаунт?</span>
                <span className={cls.registr} onClick={HandleModeAuth}>
                    Войти
                </span>
            </div>
        </form>
    );
};

export default Registration;
