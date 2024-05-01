const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
    photo: String,
    name: String,
    otherNames: [String],
    status: String,
    rating: {
        total: {
            type: Number,
            required: true
        },
        people: {
            type: Number,
            required: true
        }
    },
    like: Number,
    views: Number,
    tabs: String,
    chapters: String,
    tags: [String],
    category: String,
    description: String,
    numberOfChapters: Number,
    data: String,
    translator: {
        type: [String],
        required: true
    },
    author: String,
    genres: {
        type: [String],
        required: true
    },
    comments: [{
        author: String,
        comment: String,
        like: Number,
        disLike: Number
    }],
    chaptersLists: [{
        translator: String,
        img: [String],
        like: Number,
        data: String
    }]
});

const Manga = mongoose.model("manga", mangaSchema);

module.exports = Manga;
