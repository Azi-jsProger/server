import React, {useEffect, useState} from 'react';
import cls from "./PushCard.module.scss";
import Button from "../../../../5shered/ui/button";

type Category = "Обновление" | "Социальное" | "Важное";

interface NewsItem {
    img: string;
    data: string;
    text: string;
}

interface NotificationInfo {
    news: NewsItem[];
}

const PushCard = () => {
    const arr: Record<Category, NotificationInfo> = {
        "Обновление": {
            news: [
                { img: "/assets/DICE/diceABL.jpg", data: "2022-02-23", text: "Первая новость по обновлениям" },
                { img: "https://i.pinimg.com/236x/2f/9b/3b/2f9b3be00374fa5433b7fe06726bf571.jpg", data: "2022-02-24", text: "Вторая новость по обновлениям" },
                { img: "https://i.pinimg.com/236x/a0/3e/a2/a03ea271f04be1f2ea1034ec433a41bc.jpg", data: "2022-02-25", text: "Третья новость по обновлениям" }
            ]
        },
        "Социальное": {
            news: [
                { img: "http://localhost:3000/assets/my/photoSecretRecation.png", data: "2022-02-23", text: "Открой для себя новые манги с тайным обучением! " },
                { img: "http://localhost:3000/assets/my/The%20mistress%20of%20the%20building%20is%20my%20beautiful%20nun.png", data: "2022-02-24", text: "Вторая социальная новость" },
                { img: "http://localhost:3000/assets/my/silent%20war.png", data: "2022-02-25", text: "Третья социальная новость" }
            ]
        },
        "Важное": {
            news: [
                { img: "http://localhost:3000/assets/my/main.jpg", data: "2022-02-24", text: "первая важная новость" },
                { img: "http://localhost:3000/assets/DICE/diceABL.jpg", data: "2022-02-24", text: "Вторая важная новость" },
                { img: "http://localhost:3000/assets/my/img1.png", data: "2022-02-25", text: "Третья важная новость" }
            ]
        }
    };

    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

    const handleButtonClick = (category: Category) => {
        setSelectedCategory(category);
    };

    return (
        <div style={{marginTop: "56px"}}>
            <div>
                <h1>Уведомления</h1>
                {Object.keys(arr).map((category) => (
                    <Button key={category} onClick={() => handleButtonClick(category as Category)} content={category} />
                ))}
            </div>
            <div>
                {true && selectedCategory !== undefined && (
                    <div className={cls.boxCurd}>
                        <h2>Информация по категории "{selectedCategory}":</h2>
                        {arr[selectedCategory].news.map((news, index) => (
                            <div key={index} className={cls.curd}>
                                <img src={news.img} alt={`Изображение для новости ${index + 1}`} style={{
                                    width: '85px',
                                    height: '120px'
                                }}/><p>Дата: {news.data}</p>
                                <p>{news.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PushCard;
