import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import cls from "./MangaContent.module.scss"
import axios from "axios";
import {Loader} from "../../2widgets/Loader/Loader";
import {LocalStorageUserLastChapter} from "../../5shered/consts/localStorageUserGlava";

type TChapters = {
    data: string;
    img: string[];
    like: number;
    translator: string;
};

const MangaContent = () => {
    const { mangaId, chapter } = useParams<{ mangaId: string, chapter: string}>();
    const [loading, setLoading] = useState<boolean>(true);
    const [chaptersLists, setChaptersLists] = useState<TChapters[]>([]);
    const [chapters, setChapters] = useState<string[]>([])

    const data = [
        {
            id:1,
            translator: "GL▰Alliance",
            img: [
                "/assets/DICE/0/0.jpeg",
                "/assets/DICE/0/1.jpeg",
                "/assets/DICE/0/2.jpeg"
            ],
            like: 0,
            data: "02/05/2018"
        },
        {
            id:2,
            translator: "GL▰Alliance",
            img: [
                "/assets/DICE/1/0.jpeg",
                "/assets/DICE/1/1.jpeg",
                "/assets/DICE/1/2.jpeg",
                "/assets/DICE/1/3.jpeg",
                "/assets/DICE/1/4.jpeg",
                "/assets/DICE/1/5.jpeg",
                "/assets/DICE/1/6.jpeg",
                "/assets/DICE/1/7.jpeg",
                "/assets/DICE/1/8.jpeg",
                "/assets/DICE/1/9.jpeg",
                "/assets/DICE/1/10.jpeg",
                "/assets/DICE/1/11.jpeg",
                "/assets/DICE/1/12.jpeg"
            ],
            like: 0,
            data: "02/05/2018"
        },
        {
            id:3,
            translator: "GL▰Alliance",
            img: [
                "/assets/DICE/2/1.jpeg",
                "/assets/DICE/2/2.jpeg",
                "/assets/DICE/2/3.jpeg",
                "/assets/DICE/2/4.jpeg",
                "/assets/DICE/2/5.jpeg"
            ],
            like: 0,
            data: "02/05/2018"
        },
        {
            id:4,
            translator: "GL▰Alliance",
            img: [
                "/assets/DICE/3/0.jpeg",
                "/assets/DICE/3/1.jpeg",
                "/assets/DICE/3/2.jpeg",
                "/assets/DICE/3/3.jpeg",
                "/assets/DICE/3/4.jpeg",
                "/assets/DICE/3/5.jpeg",
                "/assets/DICE/3/6.jpeg",
                "/assets/DICE/3/7.jpeg",
                "/assets/DICE/3/8.jpeg",
                "/assets/DICE/3/9.jpeg",
                "/assets/DICE/3/10.jpeg",
                "/assets/DICE/3/11.jpeg",
                "/assets/DICE/3/12.jpeg"
            ],
            like: 0,
            data: "02/05/2018"
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5005/mangas/${mangaId}`);
                localStorage.setItem(`${LocalStorageUserLastChapter}${data?.name}`, `${chapter}`)
                setChaptersLists(data.chaptersLists)
                setLoading(true)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setChaptersLists(data)
            }
        };
        fetchData();
    }, [mangaId]);

    useEffect(() => {
        chaptersLists.forEach((manga: TChapters, id) => {
            if (id+'' === chapter) {
                setChapters(manga.img)
            }
        })
    }, [chaptersLists]);

    if (!loading) {
        return <div className={cls.loader}>
            <Loader/>
        </div>
    }

    return (
        <div className={cls.main}>
            {chapters.map((chapter, index) =>
                    <img src={chapter} alt={`Chapter ${index + 1}`}/>
            )}
        </div>
    );
};

export default MangaContent;
