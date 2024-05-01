import React, { useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom";
import cls from "./MangaContent.module.scss"
import axios from "axios";
import {LocalStorageUserLastChapter} from "../../../5shered/consts/localStorageUserGlava";
import {classNames} from "../../../5shered/styleFunction/classNameFn";
import {API_URL} from "../../../5shered/api";
import {HeaderMangaContent} from "../../../2widgets/HeaderMangaContent";
import {lastPage} from "../../../5shered/consts/lastPage";

type TChapters = {
    data: string;
    img: string[];
    like: number;
    translator: string;
};

const MangaContent = () => {
    const { mangaId, chapter, number } = useParams<{ mangaId: string, chapter: string, number: string}>();
    const [chaptersLists, setChaptersLists] = useState<TChapters>({
        data: '',
        img: [''],
        like: 0,
        translator: ''
    });

    const [chapters, setChapters] = useState<number>()
    const [Skeleton, setSkeleton] = useState<boolean>(false)


    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(1, 1);
            try {
                const { data } = await axios.get(`${API_URL}/mangaContent/${mangaId}/${chapter}`);
                localStorage.setItem(`${LocalStorageUserLastChapter}${data?.name}`, `${chapter}`)
                console.log(data)
                setChapters(data)
                setChaptersLists(data)
                    setSkeleton(true)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [mangaId, chapter]);


    useEffect(() => {
        return () => {
            sessionStorage.setItem(lastPage, "MangaContent")
        }
    }, []);

    console.log(chaptersLists)

    return (
        <div className={cls.main}>
            <HeaderMangaContent setSkeleton={setSkeleton} chapter={chapter+''} chaptersListsLength={number+''} _id={mangaId+""}/>
            <div className={classNames(cls.skelet,{[cls.skeleton]: Skeleton})}>
            </div>
            {chaptersLists.img.map((chapter, index) =>
                    <img src={chapter} alt={`Chapter ${index + 1}`} key={index}/>

            )}
        </div>
    );
};

export default MangaContent;
