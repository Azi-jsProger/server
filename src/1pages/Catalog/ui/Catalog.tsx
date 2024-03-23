import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import { AppContext } from "../../../0app/providers/StoreProvider/Provider";
import { CatalogList } from '../../../3features/CatalogList';
import { TManga } from "../../../5shered/types/MangaTypes";
import { MangaCard } from "../../../3features/MangaCard";
import cls from "./Catalog.module.scss"
import { RiMenuSearchLine } from "react-icons/ri";
import { Dropdown } from "../../../2widgets";
import CatalogSelectorsInp  from "../.././../2widgets/CatalogSelesectorsInp/ui/CatalogSelectorsInp";
import { RiArrowDropDownLine } from "react-icons/ri";
import {classNames} from "../../../5shered/styleFunction/classNameFn";

const Catalog = () => {
    const { getData, manga } = useContext(AppContext)
    const [dropdown, setDropdown] = useState(false)
    const [filteredManga, setFilteredManga] = useState<TManga[]>([])
    const [nameSelector, setNameSelector] = useState("По популярности")
    const [ifCollapsed, setIsCollapsed] = useState<boolean>(false)

    useEffect(() => {
        getData?.()
    }, []);

    useEffect(() => {
        setFilteredManga([...manga])
    }, [manga]);

    const onSortFn = (arr:TManga[]) => {
        return setFilteredManga(arr)
    }

    const log = (e: React.MouseEvent<HTMLButtonElement>) => {
        setDropdown(false);
        switch (e.currentTarget.id) {
            case "1":
                setNameSelector("По новизне");
                const sortedManga1 = [...manga].sort((a, b) => {
                    if (b.data && a.data) {
                        // @ts-ignore
                        return parseInt(b.data) - parseInt(a.data);
                    }
                    return 0;
                });
                setFilteredManga(sortedManga1);
                console.log("По новизне");
                break;
            case "2":
                setNameSelector("По последним обновлениям");
                const sortedManga2 = [...manga].sort((a, b) => {
                    const lastChapterA = a.chaptersLists?.[a.chaptersLists.length - 1];
                    const lastChapterB = b.chaptersLists?.[b.chaptersLists.length - 1];
                    if (lastChapterA && lastChapterA.data && lastChapterB && lastChapterB.data) {
                        const dateA = new Date(lastChapterA.data);
                        const dateB = new Date(lastChapterB.data);
                        return dateB.getTime() - dateA.getTime();
                    }
                    return 0;
                });
                setFilteredManga(sortedManga2);
                console.log("По последним обновлениям");
                break;
            case "3":
                setNameSelector("По популярности");
                const popularManga = [...manga].sort((a, b) => (b.like || 0) - (a.like || 0));

                setFilteredManga(popularManga);
                console.log("По популярности", popularManga);
                break;
            case "4":
                setNameSelector("По просмотрам");
                const chaptersMangas = [...manga].sort((a, b) => (b.chapters || 0) - (a.chapters || 0));

                setFilteredManga(chaptersMangas);
                console.log("По просмотрам");
                break;
            case "5":
                setNameSelector("По количеству глав");
                const chaptersManga = [...manga].sort((a, b) => (b.chapters || 0) - (a.chapters || 0));
                setFilteredManga(chaptersManga);
                console.log("По количеству глав", chaptersManga);
                break;
            case "7":
                setNameSelector("Мне повезёт");
                const luckyManga = [...manga].sort(() => Math.random() - 0.5);
                setFilteredManga(luckyManga);
                console.log("Мне повезёт", luckyManga);
                break;

            default:
                break;
        }
    }

    return (
        <div className={cls.main}>
            <div className={cls.boxHButton}>
                <div className={cls.boxTitleAndBurgerMenu}>
                    <h1 className={cls.title}>Каталог</h1>
                    <button
                        className={cls.filteredBurgerMenu}
                        onClick={() => setIsCollapsed(prev => !prev)}
                    >
                        ФИЛЬТРЫ <RiArrowDropDownLine size={28}/>
                    </button>
                </div>
                <button
                    className={cls.buttonDropdown}
                    onClick={() => { setDropdown(prev => !prev) }}
                >
                    <RiMenuSearchLine /> {nameSelector} <RiArrowDropDownLine size={24} className={cls.RiArrowDropDownLine}/>
                </button>
                {dropdown && (
                    <Dropdown
                        className={cls.Dropdown}
                        children={
                            <div className={cls.boxDropdown}>
                                <button onClick={log} id={"1"}>По новизне</button>
                                <button onClick={log} id={"2"}>По последним обновлениям</button>
                                <button onClick={log} id={"3"}>По популярности</button>
                                <button onClick={log} id={"4"}>По лайкам</button>
                                <button onClick={log} id={"5"}>По просмотрам</button>
                                <button onClick={log} id={"6"}>По количеству глав</button>
                                <button onClick={log} id={"7"}>Мне повезёт</button>
                            </div>
                        }
                    />
                )}
            </div>
            <div className={cls.boxListFilter}>
                <CatalogList
                    className={cls.catalogList}
                    manga={filteredManga}
                    render={(filteredManga: TManga) => (
                        <MangaCard
                            id={filteredManga.id}
                            photo={filteredManga.photo}
                            name={filteredManga.name}
                            category={filteredManga.category}
                            rating={filteredManga.rating}
                        />
                    )}
                />
                <div className={classNames(cls.fon, {[cls.fonActive]:ifCollapsed})}></div>
                <CatalogSelectorsInp
                    setIsCollapsed={setIsCollapsed}
                    mangas={filteredManga}
                    onSortFn={onSortFn}
                    className={classNames(cls.CatalogSelectorsInp, {[cls.CatalogSelectorsInpTransform]: ifCollapsed})}
                />
            </div>
        </div>
    );
};

export default Catalog;
