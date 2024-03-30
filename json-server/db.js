const { MongoClient } = require("mongodb");

const URL = "mongodb://localhost:27017/mangaDb";

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
    MongoClient
         .connect(URL)
         .then((client) => {
             console.log("Клиент подключен к базе данных mongoDb")
             dbConnection = client.db()
             return cb()
         })
        .catch((err) => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}
