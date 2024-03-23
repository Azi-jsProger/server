import React from 'react';
import { IPropsForTManga } from '../../../../5shered/types/types';
import cls from "../../ui/MangaDescriptionContent.module.scss"
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import {Link} from "react-router-dom";
import {AddComment} from "../../../../3features/AddComment";

const MangaDescription = ({oneManga, desc} : IPropsForTManga) => {

    return (
            <div className={cls.content}>
            {desc ?
                    <div className={cls.p}>
                        <p className={cls.descriptionManga}>
                            {oneManga?.description}
                        </p>
                        <div className={cls.boxForGenres}>
                            {oneManga?.genres?.map(manga => <span
                                className={cls.gener}>{manga}</span>
                            )}
                        </div>
                        <div className={cls.boxComments}>
                            <h2>Комментарии {oneManga?.comments?.length}</h2>
                            <AddComment id={oneManga?.id} oneManga={oneManga}/>
                            <ul className={cls.Comments}>
                                {oneManga?.comments && oneManga.comments.map((comment) =>
                                <li className={cls.boxComment}>
                                    <div>{comment?.author}</div>
                                    <div>{comment?.comment}</div>
                                    <div className={cls.boxLike}>
                                        <div><AiOutlineLike/> { comment?.like}</div>
                                        <div><AiOutlineDislike/> { comment?.disLike}</div>
                                    </div>
                                </li>)}
                            </ul>
                        </div>
                    </div>
                    :
                    <ul className={cls.ul}>
                        {oneManga?.chaptersLists && oneManga?.chaptersLists.map((card, id) =>
                            <Link to={`${id}`} key={id}>
                                <div className={cls.Li}>
                                    <div className={cls.LiElementMobileLeft}>
                                        <div className={cls.idTranslator}>
                                            <div>Глава {id}</div>
                                            <div className={cls.translator}>{card.translator}</div>
                                        </div>
                                        <span className={cls.dataMobile}>{card.data}</span>
                                    </div>
                                    <div className={cls.LiElementMobileRight}>
                                        <FaRegHeart style={{color: "#ff9800"}}/>{card.like}
                                    </div>
                                    <div className={cls.LiElementDesktop}>Глава {id}</div>
                                    <div className={cls.LiElementDesktop}>{card.translator}</div>
                                    <div className={cls.LiElementDesktop}>{card.data}</div>
                                    <div className={cls.LiElementDesktop}><FaRegHeart style={{color: "gold"}}/> {card.like}</div>
                                </div>
                            </Link>
                        )}
                    </ul>
                }

            </div>
    );
};

export default MangaDescription;