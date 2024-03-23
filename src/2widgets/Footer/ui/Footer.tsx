import React from 'react';
import cls from "./Footer.module.scss"

const Footer = () => {
    return (
        <footer className={cls.Footer}>
                <div className={cls.box1}>
                    <div className={cls.elem1}>
                        <span className={cls.ReManga}>ReManga</span>
                        <span className={cls.otvet}>Всегда готовы ответить на вопросы</span>
                        <span className={cls.vopros}>Задать вопрос</span>
                    </div>
                    <div className={cls.elem2}>
                        <span className={cls.emailFor}>Почта для связи:</span>
                        <span className={cls.email}>contact@remanga.org</span>
                    </div>
                </div>
                <div className={cls.box2}>
                    <div className={cls.elem1}>
                        <span className={cls.title}>РАЗДЕЛЫ</span>
                        <span>ПРАВИЛА САЙТА</span>
                        <span>DMCA</span>
                        <span>АВТОРСКОЕ ПРАВО</span>
                        <span>О НАС</span>
                        <span>ВАКАНСИИ</span>
                    </div>
                </div>
                <div className={cls.box3}>
                    <div className={cls.elem1}>
                        <span className={cls.title}>ИНФО</span>
                        <span>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</span>
                        <span>АГЕНТСКИЙ ДОГОВОР</span>
                        <span>СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ</span>
                        <span>МОБИЛЬНОЕ ПРИЛОЖЕНИЕ</span>
                        <span>FAQ</span>
                    </div>
                </div>
        </footer>
    );
};

export default Footer;