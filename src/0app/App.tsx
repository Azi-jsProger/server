import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import AppRouter from './providers/router/ui/AppRouter';
import { Header } from '../2widgets/Header';
import { Auth } from "../1pages/Auth";
import { AppContext } from "./providers/StoreProvider/Provider";
import { Footer } from '../2widgets/Footer';

function App() {
    const { checkAuth } = useContext(AppContext)
    const [reg, setReg] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (reg) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [reg]);

    useEffect(() => {
        if (localStorage.getItem("token")) checkAuth?.()
    }, []);

    if (location.pathname.split('/')[1] === "mangaContent")
        return (
        <div className="App">
            <AppRouter />
            {reg && <Auth setReg={setReg}></Auth>}
        </div>
    );

    return (
        <div className="App">
            <Header setReg={setReg} />
            <AppRouter />
            {reg && <Auth setReg={setReg}></Auth>}
            <Footer />
        </div>
    );
}

export default App;
