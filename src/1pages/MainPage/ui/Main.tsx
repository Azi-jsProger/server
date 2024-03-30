import React, {useContext, useEffect} from 'react';
import cls from "./Main.module.scss"
import {classNames} from "../../../5shered/styleFunction/classNameFn";
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";
import {MangaCard} from "../../../2widgets/MangaCard";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../../../5shered/api/api";

const Main = () => {
    const { manga, getData } = useContext(AppContext)



    useEffect(() => {
        getData?.()
    },[])



    return (
        <div>
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
                    manga.map(manga =>
                        <MangaCard
                            width={"128px"}
                            height={"280px"}
                            key={manga.id}
                            id={manga.id}
                            photo={manga.photo}
                            category={manga.category}
                            name={manga.name}
                            rating={manga.rating}
                        />
                    )
                }
            </div>
            <div className={classNames(cls.MainDiv)}>
                    <h4 className={classNames(cls.H4)}>Горячие новинки</h4>
                    <div className={classNames(cls.wrapperScroll)}>
                        <div className={classNames(cls.wrapperForNovelt)}>
                            {
                                manga.map(manga =>
                                    <MangaCard
                                        width={"128px"}
                                        height={"280px"}
                                        key={manga.id}
                                        id={manga.id}
                                        photo={manga.photo}
                                        category={manga.category}
                                        name={manga.name}
                                        rating={manga.rating}
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