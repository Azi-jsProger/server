import React, {useRef, useState} from 'react';
import cls from "../../../1pages/Catalog/ui/Catalog.module.scss";
import {TManga} from "../../../5shered/types/MangaTypes";
import {useClickOutside} from "../../../5shered";

interface i {
    mangas: TManga[];
    onSortFn: (arr:TManga[]) => void;
    className: string;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

type ValueInput ={
    types: string,
    genres: string,
    projectStatus?: string,
    ageRating: string,
    releaseYearFrom: string,
    releaseYearTo: string,
    ratingFrom: number,
    ratingTo: number,

};

const CatalogSelectorsInp = (props:i) => {
    const ref = useRef(null)
    const { mangas, onSortFn, className, setIsCollapsed } = props;
    const [ textInput, setTextInput ] = useState<ValueInput>(
        {
            types: "",
            genres: "",
            projectStatus: "",
            ageRating: "",
            releaseYearFrom: "",
            releaseYearTo: "",
            ratingFrom: 0,
            ratingTo: 0
        }
    );
    const [filteredMangas, setFilteredMangas] = useState<TManga[]>(mangas);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const { id } = e.currentTarget;
        setTextInput((prevTextInput) => ({
            ...prevTextInput,
            [id]: value,
        }));
    }

    const onSort = () => {
        const filteredResult = mangas.filter(manga =>{
            if ( manga.category === textInput.types ) {
                return true
            } else if (manga.genres?.includes(`${textInput.genres}`)) {
                return true
            }else if ( manga.status === textInput.projectStatus ) {
                return true
            }else if (manga.data + "" >= textInput.releaseYearFrom && manga.data + "" <= textInput.releaseYearTo) {
                return true
            }else if (manga.rating === textInput.ratingFrom) {
                return true
            }else if (manga.rating === textInput.ratingTo) {
                return true
            }else {
                return false
            }
        })
        setFilteredMangas(filteredResult);
        onSortFn(filteredResult)
    }

    useClickOutside(
        ref, () => {
            setIsCollapsed(false)
        }
    )

    return (
        <div className={className} ref={ref}>
        <div className={cls.selectorsInp}>
            <div className={cls.boxInp}>
                <div className={cls.boxTitle}>
                    <span className={cls.title}>Фильтры</span>
                    <span className={cls.reset}>ОЧИСТИТЬ</span>
                </div>
                <div className={cls.firstInputs}>
                    <input className={cls.input} placeholder={"Типы"} id={"types"} onChange={handleInputChange}/>
                </div>
                <div className={cls.firstInputs}>
                    <input className={cls.input} placeholder={"Жанры"} id={"genres"} onChange={handleInputChange as any}/>
                </div>

                <div className={cls.boxInp}>
                    <div className={cls.secondInputs}>
                    <input className={cls.input} placeholder={"Cтатус проекта"} id={"projectStatus"} onChange={handleInputChange as any}/>
                    </div>
                </div>
                <div className={cls.boxInp}>
                    <h5>Год выпуска</h5>
                    <div className={cls.thirdInputs}>
                        <div className={cls.wrapperInpMini}>
                            <input className={cls.inputMini} placeholder={"От"} type={"number"} id={"releaseYearFrom"} onChange={handleInputChange as any}/>
                            <input className={cls.inputMini} placeholder={"До"} type={"number"} id={"releaseYearTo"} onChange={handleInputChange as any}/>
                        </div>
                    </div>
                </div>
                <div className={cls.boxInp}>
                    <h5>Оценка</h5>
                    <div className={cls.forthInputs}>
                        <div className={cls.wrapperInpMini}>
                            <input className={cls.inputMini} placeholder={"От"} type={"number"} id={"ratingFrom"} onChange={handleInputChange as any}/>
                            <input className={cls.inputMini} placeholder={"До"} type={"number"} id={"ratingTo"} onChange={handleInputChange as any}/>
                        </div>
                    </div>
                </div>
                <button className={cls.button} onClick={onSort}>Применить фильтры</button>
            </div>
        </div>
        </div>
    );
};

export default CatalogSelectorsInp;