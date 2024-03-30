import React, {useContext, useEffect, useState} from 'react';
import '../App.css';
import AppRouter from './providers/router/ui/AppRouter';
import {Header} from '../2widgets/Header';
import {Auth} from "../1pages/Auth";
import {AppContext} from "./providers/StoreProvider/Provider";
import {Footer} from '../2widgets/Footer';
import axios from "axios";

function App() {
    const [reg, setReg] = useState(false);
    const {fastLoginUser} = useContext(AppContext)

    useEffect(() => {
        const dataLocalStorage = localStorage.getItem("user")
        if (dataLocalStorage) {
            const parse = JSON.parse(dataLocalStorage)
            fastLoginUser?.(parse.email, parse.password)
        }

    }, []);

    return (
        <div className="App">
            <Header setReg={setReg}/>
            <AppRouter/>
            {reg && <Auth setReg={setReg}></Auth>}
            <Footer/>
        </div>
    );
}

export default App;
