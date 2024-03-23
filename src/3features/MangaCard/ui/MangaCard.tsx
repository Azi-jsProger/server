import React from 'react';
import cls from "./MangaCard.module.scss"
import { classNames } from "../../../5shered/styleFunction/classNameFn";
import {Link} from "react-router-dom";
import {TManga} from "../../../5shered/types/MangaTypes";

const MangaCard = (props: TManga) => {

    const { id, photo, name, category, rating } = props

    return (
        <>
            <Link to={`/manga/${id}`}>
                <div className={classNames(cls.element)}>
                    <div className={classNames(cls.wrapperForImg)}>
                        <img
                            className={classNames(cls.img)}
                            src={photo}
                            alt={"Технические шоколадки"}
                        />
                    </div>
                    <p className={cls.category}>{category} <span className={classNames(cls.rating)}> {rating}</span> <span
                        className={classNames(cls.z)}>★</span></p>
                    <h5 className={cls.name}>{name}</h5>
                </div>
            </Link>
        </>
);
};

export default MangaCard;
