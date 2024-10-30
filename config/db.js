const mongoose = require("mongoose");
const colors = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/blogapi`);
        console.log(`Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MONGO connect error`.bgRed.white);
    }
};

module.exports = connectDB;

/*if you want to connect mongoDB atlas then use only:
await mongoose.connect(process.env.MONGO_URL);
*/

/*
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => console.log("Connected to the database successfully"))
    .catch((err) => console.error("Connection failed", err));

*/