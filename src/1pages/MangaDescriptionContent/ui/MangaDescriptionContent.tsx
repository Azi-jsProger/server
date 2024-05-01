import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import cls from "./MangaDescriptionContent.module.scss";
import CardMangaBoxForRating from "../model/CardMangaBoxForRating/CardMangaBoxForRating";
import MagnaImgNuv from "../../../3features/MangaImgNuv/ui/MagnaImgNuv";
import MangaDescription from '../model/mangaDescription/mangaDescription';
import Button from "../../../5shered/ui/button";
import { AppContext } from "../../../0app/providers/StoreProvider/Provider";
import { LocalStorageUserLastChapter } from "../../../5shered/consts/localStorageUserGlava";
import { ContinueReadingManga } from "../../../3features/ContinueReadingManga";
import {lastPage} from "../../../5shered/consts/lastPage";

const MangaDescriptionContent: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const { oneManga, getOneManga, resetOneManga } = useContext(AppContext);
    const [desc, setDesc] = useState<boolean>(sessionStorage.getItem(`setDesc${itemId}`) === 'false' ? false : true)

    useEffect(() => {
        const lastPageFromStorage = sessionStorage.getItem(lastPage);
        const scrollPosition: any = sessionStorage.getItem(itemId+"");

        if (lastPageFromStorage && scrollPosition) {
            const lastPageName = lastPageFromStorage
            const { x, y } = scrollPosition

            if (lastPageName === 'MangaContent') {
                window.scrollTo(x, y);
                console.log("MangaContent")
            } else {
                window.scrollTo(0, 0)
                console.log("0, 0")
            }
        }
        if (itemId) {
            getOneManga?.(itemId)
        }
    }, []);

    useEffect(() => {
        return () => {
            resetOneManga?.()
            const dataSave = {x: window.screenX, y: window.scrollY}
            sessionStorage.setItem(`${itemId}`, JSON.stringify(dataSave))
            sessionStorage.setItem(lastPage, "MangaDescriptionContent")
        };
    }, []);

    const lastChapter = localStorage.getItem(`${LocalStorageUserLastChapter}${oneManga?.name}`) || 0

    const TRUE = () => {
        setDesc(true)
        sessionStorage.setItem(`setDesc${itemId}`, "true")
    }

    const FALSE = () => {
        setDesc(false)
        sessionStorage.setItem(`setDesc${itemId}`, "false")
    }

    return (
        <div className={cls.box}>
            <MagnaImgNuv oneManga={oneManga} itemId={itemId+""}/>
            <div className={cls.boxForDescriptionOfContent}>
                {/* Описание рейтингов, категории и даты */}
                <div className={cls.boxForOtherNames}>
                    {oneManga?.otherNames?.map((elem, id) => <span key={id}> {`${elem}/`}</span>)}
                </div>
                <div className={cls.boxForName}>
                    <h1 className={cls.NameTitle}>{oneManga?.name}<span
                        className={cls.status}>[{oneManga?.status}]</span></h1>
                    <h5 className={cls.categoryAndData}>{oneManga.category} {oneManga.data}, {oneManga?.status}</h5>
                </div>
                <CardMangaBoxForRating oneManga={oneManga}/>
                <div className={cls.description}>
                    <div className={cls.boxforbtn}>
                        <Button onClick={TRUE} content={"ОПИСАНИЕ"} className={cls.ButtonDescription}/>
                        <Button onClick={FALSE} content={"ГЛАВЫ"} className={cls.ButtonDescription}/>
                    </div>
                    <MangaDescription oneManga={oneManga} desc={desc}/>
                </div>
                <ContinueReadingManga itemId={itemId+''} chaptersLists={oneManga.chaptersLists} lastChapter={lastChapter}/>
            </div>
        </div>
    );
};

export default MangaDescriptionContent;
