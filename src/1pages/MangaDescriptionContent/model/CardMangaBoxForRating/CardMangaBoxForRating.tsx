import React from 'react';
import cls from "../../ui/MangaDescriptionContent.module.scss";
import {IoStarSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";
import {BsBookmarksFill, BsFillEyeFill} from "react-icons/bs";
import {IPropsForTManga} from "../../../../5shered/types/types";
import {numberConverter} from "../../../../5shered";


const CardMangaBoxForRating = ({oneManga}:IPropsForTManga) => {
    return (
        <div className={cls.boxForRating} >

                    <span className={cls.elementRating}>
                        <IoStarSharp className={cls.star}/>
                        <span className={cls.views}>{oneManga?.rating}</span>
                    </span>
            <span className={cls.elementRating}>
                        <FaHeart className={cls.heart}/>
                        <span className={cls.views}>{oneManga?.like &&  numberConverter?.(oneManga?.like)}</span>
                    </span>
            <span className={cls.elementRating}>
                        <BsFillEyeFill className={cls.eyes}/>
                        <span className={cls.views}>{oneManga?.views &&  numberConverter?.(oneManga?.views)}</span>
                    </span>
            <span className={cls.elementRating}>
                        <BsBookmarksFill className={cls.bsBook}/>
                        <span className={cls.views}>{oneManga?.tabs &&  numberConverter?.(oneManga?.tabs)}</span>
                    </span>
            <span className={cls.category}>
                        <span className={cls.views}>{oneManga?.category}</span>
                    </span>
            <span className={cls.data}>
                        <span className={cls.views}>{oneManga?.data}</span>
                    </span>
        </div>
    );
};

export default CardMangaBoxForRating;