require('dotenv').config()
const mongoose = require('mongoose');

const connectString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-x4i3o.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(connectString)
mongoose.set("useCreateIndex", true);

mongoose.connection.on("connected", () => {
    console.log(`Connected to ${connectString}`);
})

mongoose.connection.on("error", (err) => {
    console.log(`Connected to ${connectString} error ${err}`);
});

mongoose.connection.on("disconnected", () => {
    console.log(`Disconnected from ${connectString}`);
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Disconnected from " + connectionString + " through app termination");
        process.exit(0);
    });
});