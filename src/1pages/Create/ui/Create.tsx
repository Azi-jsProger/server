import React, { useCallback, useState } from 'react';
import cls from './Create.module.scss';
import axios from 'axios';
import { classicMangaGenres } from '../module/consts/geners';
import {API_URL} from "../../../5shered/api";

const Create = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [typeManga, setTypeManga] = useState<string>("");
    const [g, setG] = useState<string[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imagesArray: File[] = [];

            for (let i = 0; i < files.length; i++) {
                imagesArray.push(files[i]);
            }
            setSelectedImages(imagesArray);
        }
    };

    const setNameFn = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, []);
    const setDescriptionFn = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }, []);
    const setTypeMangaFn = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTypeManga(e.target.value)
    }, []);

    const onClick = (id: number) => {
        const gener = classicMangaGenres[id];
        if (g.includes(gener)) {
            setG(g.filter((item) => item !== gener));
        } else {
            setG([...g, gener]);
        }
    };

    {/* В компоненте */}

    const postData = async () => {
        try {
            const formData = new FormData()

            formData.append('photo', selectedImage!);

            // Добавляем изображения в форму
            selectedImages.forEach((image, index) => {
                formData.append(`image${index}`, image); // Используем уникальные ключи для каждого изображения
            });

            // Преобразуем selectedImages в массив объектов с ключом 'img'
            const chaptersLists = selectedImages.map((image, index) => ({ img: `image${index}` }));
            formData.append('chaptersLists', JSON.stringify(chaptersLists));

            formData.append('name', name);
            formData.append('description', description);
            formData.append('category', typeManga);
            formData.append('consts', JSON.stringify(g));
            formData.append('nameFolder', `folder${Math.random()}`);

            const obj = Object.fromEntries(formData)
            console.log(obj)

            const response = await axios.post(`${API_URL}/mangas`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (error) {
            console.log('Error posting data:', error);
        }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postData();
    };

    return (
        <div>
            <form className={cls.form} onSubmit={handleSubmit}>
                <div className={cls.boxImg}>
                    {selectedImage && (
                        <div>
                            <img
                                className={cls.img}
                                src={URL.createObjectURL(selectedImage)}
                                alt="Выбранное изображение"
                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                            />
                        </div>
                    )}
                    Выбрать обложку
                    <input className={cls.inpImg} type="file" accept="image/*" onChange={handleImageChange} />
                    Выбрать главы
                    <div>
                        <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
                    </div>
                    <button type="submit">Добавить</button>
                </div>
                <div className={cls.boxInp}>
                    <div className={cls.boxInpName}>
                        <input
                            className={cls.Name}
                            placeholder="Название тайтла"
                            value={name}
                            onChange={setNameFn}
                        />
                        <input
                            className={cls.typeManga}
                            placeholder="Тип манги"
                            value={typeManga}
                            onChange={setTypeMangaFn}
                        />
                    </div>
                    <div className={cls.boxDescription}>
                        <textarea
                            className={cls.Description}
                            placeholder="Описание манги"
                            value={description}
                            onChange={setDescriptionFn}
                        />
                    </div>
                    <div className={cls.boxGener}>
                        <div className={cls.h3}>
                            <h3>Выбранные жанров</h3>
                        </div>
                        <div className={cls.boxGeners}>{g.map((gener, index) => <div key={index} className={cls.gener}>{gener}</div>)}</div>
                    </div>
                    <div className={cls.Geners}>
                        <div className={cls.h3}>
                            <h3>Выбор жанров</h3>
                        </div>
                        <div className={cls.boxGeners}>
                            {classicMangaGenres.map((gener, id) => (
                                <div key={id} className={cls.gener} onClick={() => onClick(id)}>
                                    {gener}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Create;
