require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const connectToMongo = require('./db');
const userRoutes = require('./routes/users.js');
const videoRoutes = require('./routes/videos.js');
const commentRoutes = require('./routes/comments.js');
const authRoutes = require('./routes/auth.js');

const app = express();
app.use(cookieParser());
app.use(express.json());

const CorsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(CorsOptions));

// app.use(cors());
connectToMongo();
const port = process.env.PORT|| 5000
// console.log(process.env)
console.log(process.env.NODE_ENV);

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, resp, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return resp.status(status).json({
        success: false,
        status,
        message
    })
});

app.listen(port, () => {
    console.log(`NoteHub backend listening on port ${port}`)
  })