const jwt = require('jsonwebtoken');
const createError = require('./error.js');
const jwtKey = "smitims";

const verifyToken = (req, resp, next) => {

    // Get the user from the jwt token and id to req object
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not Authenticated!"));
    }

    jwt.verify(token, jwtKey, (error, user) => {
        if (error) {
            return next(createError(403, "Please authenticate using a valid token!"));
        }
        req.user = user;
        next();
    });
};

module.exports = verifyToken;