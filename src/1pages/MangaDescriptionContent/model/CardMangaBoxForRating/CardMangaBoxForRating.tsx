import React from 'react';
import cls from "../../ui/MangaDescriptionContent.module.scss";
import {IoStarSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";
import {BsBookmarksFill, BsFillEyeFill} from "react-icons/bs";
import {IPropsForTManga} from "../../../../5shered/types/types";
import {numberConverter} from "../../../../5shered";


const CardMangaBoxForRating = ({oneManga}:IPropsForTManga) => {
    const resultRating =  oneManga?.rating && oneManga?.rating?.total / oneManga?.rating?.people
    const strResultRating = resultRating+''

    return (
        <div className={cls.boxForRating} >
            <div className={cls.wrapper}>
                <div className={cls.titleElementMobile}>Рейтинг</div>
                <span className={cls.elementRating}>
                        <IoStarSharp className={cls.star}/>
                        <span className={cls.views}>{strResultRating.slice(0, 4)}</span>
                    </span>
            </div>
            <div>
                <div className={cls.titleElementMobile}>Лайков</div>
                <span className={cls.elementRating}>
                        <FaHeart className={cls.heart}/>
                        <span className={cls.views}>{oneManga?.like && numberConverter?.(oneManga?.like)}</span>
                    </span>
            </div>
            <div>
                <div className={cls.titleElementMobile}>Просмотров</div>
                <span className={cls.elementRating}>
                        <BsFillEyeFill className={cls.eyes}/>
                        <span className={cls.views}>{oneManga?.views && numberConverter?.(oneManga?.views)}</span>
                    </span>
            </div>
            <div>
                <div className={cls.titleElementMobile}>В закладках</div>
                <span className={cls.elementRating}>
                        <BsBookmarksFill className={cls.bsBook}/>
                        <span className={cls.views}>{oneManga?.tabs && numberConverter?.(oneManga?.tabs)}</span>
                    </span>
            </div>

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