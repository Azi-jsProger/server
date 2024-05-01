import React, {useContext, useRef, useState} from 'react';
import { FaUser } from "react-icons/fa6";
import cls from "./HeaderMangaContent.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";
import useClickOutside from "../../../5shered/customHook/useClickOutside";
import {classNames} from "../../../5shered/styleFunction/classNameFn";

type THeadersProps = {
    setReg?: React.Dispatch<React.SetStateAction<boolean>>;
    _id: string;
    chaptersListsLength: string;
    chapter: string;
    setSkeleton: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderMangaContent = (props: THeadersProps) => {
    const { setReg, _id, chaptersListsLength, chapter, setSkeleton } = props
    const { user } = useContext(AppContext)
    const refHeader = useRef(null)
    const navigate = useNavigate();
    const [isPrevious, setIsPrevious] = useState<boolean>(false);
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null); // Ref для основного контейнера

    const toggleRefHeader = () => {
        setIsCollapsed((prev) => !prev)
    }

    useClickOutside(refHeader, toggleRefHeader)

    const previous = () => {
        const previousChapter = +chapter - 1;
        if (chapter > '0') {
            navigate(`/mangaContent/${_id}/${previousChapter}/${chaptersListsLength}`);
            setSkeleton(false);
            toggleRefHeader();
        }
    };

    const next = () => {
        const nextChapter = +chapter + 1;
        if (chapter < chaptersListsLength) {
            navigate(`/mangaContent/${_id}/${nextChapter}/${chaptersListsLength}`);
            setSkeleton(false);
            toggleRefHeader();
        }
    };

    return (
        <header className={classNames(cls.header, {[cls.isCollapsed]: isCollapsed})} ref={refHeader}>
            <nav className={cls.nav}>
                <div className={cls.One}>
                    <Link to={'/main'}>
                        <img
                            className={cls.logo}
                            src={"/assets/logo.jpeg"}
                            alt={""}
                        />
                    </Link>
                    <Link to={'/manga/Catalog'} className={cls.catalog}>
                        <div>Каталог</div>
                    </Link>
                    <Link to={'/manga/mangaTops'} className={cls.tops}>
                        <div>Топы</div>
                    </Link>
                    <Link to={''} className={cls.select}>
                        <div>Поиск</div>
                    </Link>
                </div>
                <div></div>
                <div className={cls.tree}>
                    <Link to={""} className={cls.bookmarks}>
                        Закладки
                    </Link>
                    <Link to={'/manga/push'} className={cls.push}>
                        Уведомление
                    </Link>

                    {
                        user
                            ? <button className={cls.userLogo}>
                                <FaUser color={"white"}/>
                            </button>
                            : <button onClick={() =>
                                setReg?.(prev => !prev)}
                                      className={cls.login}>
                                Войти
                            </button>
                    }

                </div>
            </nav>
            <div className={cls.main} ref={ref}>
                <div
                    className={cls.conteiner1}
                    onClick={() => navigate(`/manga/${_id}`)}
                >
                    <span className={cls.strelka}></span>
                    <div className={cls.navigate}>К ТАЙТЛУ</div>
                </div>
                <div className={cls.conteiner2}>
                    <button onClick={previous} className={classNames(cls.btnLeft, {[cls.disabled]: isPrevious})}>
                        <span>{'<'}</span>
                    </button>
                    <div className={cls.btnCenter}>
                    <span>
                        {chapter} - {chaptersListsLength}
                    </span>
                    </div>
                    <button onClick={next} className={classNames(cls.btnRight, {[cls.disabled]: isNext})}>
                        <span>{'>'}</span>
                    </button>
                </div>
                <div className={cls.conteiner3}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </header>
    );
};

export default HeaderMangaContent;