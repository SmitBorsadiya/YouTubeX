const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@cluster0.jznji6p.mongodb.net/`;

const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectToMongo;