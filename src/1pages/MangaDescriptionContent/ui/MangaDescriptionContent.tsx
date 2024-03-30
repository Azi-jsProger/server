import React, {useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import cls from "./MangaDescriptionContent.module.scss";
import CardMangaBoxForRating from "../model/CardMangaBoxForRating/CardMangaBoxForRating";
import CardMagnaBoxForImgNuv from "../model/CardMagnaBoxForImgNuv/CardMagnaBoxForImgNuv";
import MangaDescription from '../model/mangaDescription/mangaDescription';
import Button from "../../../5shered/ui/button";
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";
import axios from "axios";
import {LocalStorageUserLastChapter} from "../../../5shered/consts/localStorageUserGlava";


const MangaDescriptionContent: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const [desc, setDesc] = useState(true)
    const { oneManga, getOneManga } = useContext(AppContext)

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5005/manga/${itemId}`);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchData?.()
        itemId ? getOneManga?.(itemId) : console.log("itemId не пришел или он false")
    }, []);

    const TRUE = () => {
        setDesc(true)
    }

    const FALSE = () => {
        setDesc(false)
    }

    console.log(oneManga)

    return (
        <div className={cls.box}>
            <CardMagnaBoxForImgNuv oneManga={oneManga}/>
            <div className={cls.boxForDescriptionOfContent}>
                {/* Описание рейтингов, категории и даты */}
                <div className={cls.boxForOtherNames}>
                    {oneManga?.otherNames?.map((elem, id) => <span key={id}> {`${elem}/`}</span>)}
                </div>
                <div className={cls.boxForName}>
                    <h1 className={cls.NameTitle}>{oneManga?.name}<span className={cls.status}>[{oneManga?.status}]</span></h1>
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
            </div>
        </div>
    );
};

export default MangaDescriptionContent;
