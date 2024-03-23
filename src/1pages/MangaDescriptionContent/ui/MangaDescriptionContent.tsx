import React, {useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import cls from "./MangaDescriptionContent.module.scss";
import CardMangaBoxForRating from "../model/CardMangaBoxForRating/CardMangaBoxForRating";
import CardMagnaBoxForImgNuv from "../model/CardMagnaBoxForImgNuv/CardMagnaBoxForImgNuv";
import MangaDescription from '../model/mangaDescription/mangaDescription';
import Button from "../../../5shered/ui/button";
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";


const MangaDescriptionContent: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const [desc, setDesc] = useState(true)
    const { oneManga, getOneManga } = useContext(AppContext)

    const data = {
        id: 2,
        photo: '/assets/DICE/diceABL.jpg',
        link: '',
        name: 'Кости',
        otherNames:["DICE",
            "The cube that changes everything",
            "YUN Hyunseok",
            "النرد: المكعب الذي يغير كل شيء ",
            "다이스"],
        author: "",
        category: "Манхва",
        chapters: 3,
        chaptersLists:[{
            "translator": "GL▰Alliance",
            "img": [
                "/assets/DICE/0/0.jpeg",
                "/assets/DICE/0/1.jpeg",
                "/assets/DICE/0/2.jpeg"
            ],
            "like": 0,
            "data": "02/05/2018"
        },
            {
                "translator": "GL▰Alliance",
                "img": [
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
                "like": 0,
                "data": "02/05/2018"
            },
            {
                "translator": "GL▰Alliance",
                "img": [
                    "/assets/DICE/2/0.jpeg",
                    "/assets/DICE/2/1.jpeg",
                    "/assets/DICE/2/2.jpeg",
                    "/assets/DICE/2/3.jpeg",
                    "/assets/DICE/2/4.jpeg",
                    "/assets/DICE/2/5.jpeg"
                ],
                "like": 0,
                "data": "02/05/2018"
            },
            {
                "translator": "GL▰Alliance",
                "img": [
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
                "like": 0,
                "data": "02/05/2018"
            }],
        comments: [],
        data: 2013,
        description: "Главный герой - неудачник, стоящий на самой нижней ступени школьной иерархии. Он тайно влюблен в первую красавицу школы, но не решается даже заговорить с ней. Но неожиданно в классе появляется новенький, который является полной противоположностью главного героя: он умен, красив, силен и хороший спортсмен. Новенький предлагает главному герою возможность полностью изменить жизнь. Как? Сыграть в игру, в которой надо выполнять задания и получать за их выполнение награду. \n\n",
        genres: ['Экшен', 'Приключения', 'Сёнэн', 'Фэнтези', 'Драма', 'Психология', 'Сверхъестественное', 'Школьная жизнь', 'Веб', 'В цвете', 'ГГ мужчина'],
        like: 3282000,
        rating: 7.2,
        status: " Завершен",
        tabs:26000,
        translator:[],
        views:2400000
    }


    useEffect(() => {
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
