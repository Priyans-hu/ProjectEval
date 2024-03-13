const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.DB_PATH)
    .then(
        (res) => {
            console.log("Connection to database was successful");
        },
        (err) => {
            console.error("Oops! Failed to connect with database");
        }
    )
    .catch((err) => {
        console.error("Oops! Failed to connect with database");
    });