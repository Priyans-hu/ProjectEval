const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

require("dotenv").config();
require("./config/dbConnection");

const StudentRoute = require("./routes/StudentRoutes");
const MentorRoute = require("./routes/MentorRoutes");

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000', 'https://projecteval-backend.onrender.com', 'https://projecteval.onrender.com'];

const corsOptions = {
    origin: (origin, callback) => {
        const isAllowed = allowedOrigins.includes(origin) || !origin;
        callback(null, isAllowed);
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/student", StudentRoute);
app.use("/api/mentor", MentorRoute);

app.listen(port, () => {
    console.log(`App server is listening on port: ${port}`);
});