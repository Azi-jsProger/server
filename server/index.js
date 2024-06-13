const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Manga = require("./models/Manga");
const authRouter = require("./router/authRouter");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = 5000;
const URL = "mongodb+srv://Arsen03120312:jollo03120312@authroles.kjrqtve.mongodb.net/mangaDb?retryWrites=true&w=majority";

const app = express();
const ObjectId = mongoose.Types.ObjectId;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use("/auth", authRouter);

mongoose
    .connect(URL)
    .then(() => console.log("mongoose был запущен"))
    .catch((err) => console.log(err));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Запущен бекенд на порту ${PORT}`);
});

app.use(errorMiddleware);

app.get('/manga/main', (req, res) => {
    Manga.find().then((manga) => {
        res.status(200).json(manga);
    });
});

app.get('/manga', (req, res) => {
    Manga.find({}, {photo: 1, name: 1, category: 1, rating: 1, id: 1, _id: 1}, {})
        .then((manga) => {
            res.status(200).json(manga);
        })
        .catch((err) => console.log(err));
});

app.get('/manga/:id', (req, res) => {
    const mangaId = req.params.id;

    Manga.findById(mangaId)
        .then((manga) => {
            if (!manga) {
                console.log('Манга не найдена');
                res.status(404).send('Манга не найдена');
                return;
            }
            res.status(200).json(manga);
        })
        .catch((err) => {
            console.error('Ошибка при поиске манги:', err);
            res.status(500).send('Ошибка при поиске манги');
        });
});

app.get('/mangaContent/:id/:chapter', (req, res) => {
    const mangaId = req.params.id;
    const chapterIndex = parseInt(req.params.chapter);

    Manga.aggregate([
        { $match: {_id: new ObjectId(mangaId)} },
        { $project: {secondChapterList: { $arrayElemAt: ['$chaptersLists', chapterIndex] } } }
    ])
    .then((result) => {
        if (result.length === 0 || !result[0].secondChapterList) {
            console.log('Манга не найдена');
            return;
        }
        res.status(200).json(result[0].secondChapterList);
    })
    .catch((err) => {
        console.error('Ошибка при выполнении агрегации:', err);
    });
});
