import React from 'react';
import cls from "./MangaCard.module.scss"
import { classNames } from "../../../5shered/styleFunction/classNameFn";
import {Link} from "react-router-dom";
import {TManga} from "../../../5shered/types/MangaTypes";

interface StyleProps {
    width?: string;
    height?: string;
    element?: string;
    wrapperForImg?: string;
    img?: string
}

const MangaCard = (props: TManga & StyleProps) => {

    const { id, photo, name, category, rating, width, height, element, wrapperForImg, img } = props

    return (
        <div className={classNames(cls.element, {}, [element])} style={{width:width, height:height}}>
            <Link to={`/manga/${id}`}>
                <div className={classNames(cls.curd)}>
                    <div className={classNames(cls.wrapperForImg, {}, [wrapperForImg])} style={{width:width, height:"75%"}}>
                        <img
                            className={classNames(cls.img, {}, [img])}
                            src={photo}
                            alt={"Технические шоколадки"}
                        />
                    </div>
                    <p className={cls.category}>{category} <span className={classNames(cls.rating)}> {rating}</span> <span
                        className={classNames(cls.z)}>★</span></p>
                    <h5 className={cls.name}>{name}</h5>
                </div>
            </Link>
        </div>
);
};

export default MangaCard;
