import React from 'react';
import {classNames} from "../../../5shered/styleFunction/classNameFn";
import cls from "./MangaImgNuv.module.scss"
import Button from "../../../5shered/ui/button";
import {IPropsForTManga} from "../../../5shered/types/types";
import {Link} from "react-router-dom";
import {LocalStorageUserLastChapter} from "../../../5shered/consts/localStorageUserGlava";
import {RiArrowDropDownLine} from "react-icons/ri";
import { PiBookmarkSimpleLight } from "react-icons/pi";

type TProps = {
    itemId: string
}

const MagnaImgNuv = ({ oneManga, itemId }:IPropsForTManga & TProps) => {
    const lastChapter = localStorage.getItem(`${LocalStorageUserLastChapter}${oneManga?.name}`) || 0

    return (
        <div className={cls.mangaContainer}>
            {oneManga && (
                <div className={cls.wrapperBoxImg}>
                    {/* Картинка и кнопка чтения и добавления в закладки */}
                    <div className={cls.boxImg}>
                        {/* Для скелетона, когда картинка грузится долго */}
                        {oneManga.photo && (
                            <img
                                className={classNames(cls.backgroundImage)}
                                src={oneManga.photo}
                                alt={'Технические шоколадки'}
                            />)}
                        {oneManga.photo ? (
                            <img
                                className={classNames(cls.photo)}
                                src={oneManga.photo}
                                alt={'Технические шоколадки'}
                            />
                        ) : (
                            <div className={classNames(cls.skyliton)}></div>
                        )}
                    </div>
                    <div className={classNames(cls.boxForButton)}>
                        {oneManga.chaptersLists && oneManga.chaptersLists.length ? (
                            <Link
                                to={`/mangaContent/${itemId}/${lastChapter}`}
                                className={classNames(cls.buttonA)}
                            >
                                {lastChapter ? `Продолжить с ${lastChapter}-главы` : "Читать"}
                            </Link>
                        ) : (
                            <button
                                className={cls.buttonNoneChapter}
                            >
                                Нет глав
                            </button>
                        )}
                        <Button
                            className={classNames(cls.buttonZakladkaDesktop)}
                            content={"Добавить в закладки"}
                        />
                        <Button
                            className={classNames(cls.buttonZakladkaMobile)}
                            content={<div style={{display:"flex",justifyContent:"center", alignItems:"center"}}><PiBookmarkSimpleLight size={24} fontWeight={700}/><RiArrowDropDownLine size={18}/></div>}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MagnaImgNuv;