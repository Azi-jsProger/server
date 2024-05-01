import React, { useCallback, useContext, useEffect, useState } from 'react';

import cls from "./MangaTops.module.scss";

import {classNames} from "../../5shered/styleFunction/classNameFn";
import MangaBlockCard from "../../2widgets/MangaBlockCard/MangaBlockCard";
import {AppContext} from "../../0app/providers/StoreProvider/Provider";
import {Link} from "react-router-dom";

const MangaTops = () => {
    const { getData, manga } = useContext(AppContext);
    const [dbManga, setDbManga] = useState<any[]>(manga);

    useEffect(() => {
        getData?.()
    }, []);

    useEffect(() => {
            setDbManga(manga);
    }, [manga])

    const sortByNewest = useCallback(() => {
        const sortedDb = [...manga].sort((a, b) => {

            const dateA = a.data ? new Date(a.data) : new Date(0);
            const dateB = b.data ? new Date(b.data) : new Date(0);
            return dateB.getTime() - dateA.getTime();
        });
        setDbManga(sortedDb);

    }, [manga]);

    const sortByMonth = useCallback(() => {
        const currentDate = new Date();
        const sortedDb = manga.filter(item => {
            const mangaDate = new Date(item.data || "");
            return mangaDate.getMonth() === currentDate.getMonth();
        });
        setDbManga(sortedDb);

    }, [manga]);

    return (
        <div>
            <div className={cls.Tops_Header}>
                <h1>Топ</h1>
                <div className={cls.headerHeader}>
                    <button onClick={sortByNewest}>Новинок</button>
                    <button onClick={sortByMonth}>Месяца</button>
                </div>
            </div>
            <div className={classNames(cls.listForMangas)}>
                {dbManga.map((mangaItem, id) =>
                    <Link to={`/manga/${mangaItem._id}`}>
                    <MangaBlockCard
                        key={id}
                        id={id +1}
                        photo={mangaItem.photo || ""}
                        views={mangaItem.views || 0}
                        like={mangaItem.like || 0}
                        rating={mangaItem.rating || 0}
                        genres={mangaItem.genres || []}
                        name={mangaItem.name || ""}
                        category={mangaItem.category || ""}
                    />
                        </Link>
                )}
            </div>

        </div>
    );
};

export default MangaTops;
