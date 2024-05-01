import React from 'react';
import cls from "./MangaCard.module.scss"
import { classNames } from "../../../5shered/styleFunction/classNameFn";
import {Link} from "react-router-dom";
import {TManga} from "../../../5shered/types/MangaTypes";

interface IPropsMangaCard {
    width?: string;
    height?: string;
    element?: string;
    wrapperForImg?: string;
    img?: string
    onClick?: () => void
    manga?: TManga
}

const MangaCard = (props: IPropsMangaCard ) => {

    const { manga, width, height, element, wrapperForImg, img, onClick } = props

    const ratingNumber = manga?.rating &&  manga?.rating?.total / manga?.rating?.people
    const ratingString = ratingNumber+""

    return (
        <div className={classNames(cls.element, {}, [element])} style={{width:width, height:height}} onClick={onClick}>
            <Link to={`/manga/${manga?._id}`}>
                <div className={classNames(cls.curd)}>
                    <div className={classNames(cls.wrapperForImg, {}, [wrapperForImg])} style={{width:width, height:"75%"}}>
                        <img
                            className={classNames(cls.img, {}, [img])}
                            src={manga?.photo}
                            alt={"Технические шоколадки"}
                        />
                    </div>
                    <div className={cls.description}>
                        <p className={cls.category}>{manga?.category} <span
                            className={classNames(cls.rating)}> {ratingString.slice(0,4)}</span> <span
                            className={classNames(cls.z)}>★</span></p>
                        <h5 className={cls.name}>{manga?.name}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MangaCard;
