const express = require("express");
const { connectToDb, getDb } = require("./db");
const cors = require("cors"); // Импортируем модуль для работы с CORS

const PORT = 5005;

const app = express();

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Запущен бекенд на порту ${PORT}`);
        });
        db = getDb();
    } else {
        console.log(`Ошибка при подключении к базе данных ${err}`);
    }
});

// Применяем CORS к нашему Express-приложению
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/manga', (req, res) => {
    const mangaList = [];
    console.log(req.params)

    db
        .collection("manga")
        .find()
        .forEach((manga) => mangaList.push(manga))
        .then(() => {
            res
                .status(200)
                .json(mangaList);
        });
});

