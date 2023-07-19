const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');

require('./db');
const userRoutes = require('./routes/users.js');
const videoRoutes = require('./routes/videos.js');
const commentRoutes = require('./routes/comments.js');
const authRoutes = require('./routes/auth.js');

const app = express();
// app.use(cookieParser());
app.use(express.json())
app.use(cors());

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

app.listen(4000);