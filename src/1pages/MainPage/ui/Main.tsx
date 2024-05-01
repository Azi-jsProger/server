import React, {useCallback, useContext, useEffect} from 'react';
import cls from "./Main.module.scss"
import {classNames} from "../../../5shered/styleFunction/classNameFn";
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";
import {MangaCard} from "../../../2widgets/MangaCard";
import {Link} from "react-router-dom";
import {lastPage} from "../../../5shered/consts/lastPage";

const Main = () => {
    const { manga, getData } = useContext(AppContext)

    useEffect(() => {
        const lastPageFromStorage = sessionStorage.getItem(lastPage);
        const scrollPosition: any = sessionStorage.getItem("main");

        if (lastPageFromStorage === 'MangaDescriptionContent') {
            const scr = JSON.parse(scrollPosition)
            if (scr) {
                const { x, y } = scr
                window.scrollTo(x, y);
                console.log(x, y)
            }


        } else {
            window.scrollTo(0, 0)
            console.log(0, 0)
        }
        getData?.()
    },[])

    useEffect(() => {
        return () => {
            const dataSave = {x: window.screenX, y: window.scrollY}
            sessionStorage.setItem(lastPage, "main")
            sessionStorage.setItem("main", JSON.stringify(dataSave))
        }
    }, []);

    return (
        <div style={{marginTop: "56px"}}>
            <div className={cls.nuvBar}>
                <Link to={'/manga/Catalog'} className={cls.catalog}>
                    КАТАЛОГ
                </Link>
                <Link to={'/manga/mangaTops'} className={cls.tops}>
                    ТОПЫ
                </Link>
                <Link to={''}>
                    ПОИСК
                </Link>
            </div>
            <div className={classNames(cls.boxScroll)}>
                {
                    manga.map((manga, index) =>
                        <MangaCard
                            width={"128px"}
                            height={"280px"}
                            key={index}
                            manga={manga}
                        />
                    )
                }
            </div>
            <div className={classNames(cls.MainDiv)}>
                    <h4 className={classNames(cls.H4)}>Горячие новинки</h4>
                    <div className={classNames(cls.wrapperScroll)}>
                        <div className={classNames(cls.wrapperForNovelt)}>
                            {
                                manga.map((manga, index) =>
                                    <MangaCard
                                        width={"128px"}
                                        height={"280px"}
                                        key={index}
                                        manga={manga}
                                    />
                                )
                            }
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Main;