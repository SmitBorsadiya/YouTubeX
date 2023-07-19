const jwt = require('jsonwebtoken');
const createError = require('./error');
const jwtKey = "smitims";

const verifyToken = (req, resp, next) => {

    // Get the user from the jwt token and id to req object
    const token = req.headers['auth-token'];
    if (!token) {
        return next(createError(401, "You are not Authenticated!"));
    }
    try {
        const data = jwt.verify(token, jwtKey);
        req.user = data.user;
        next();
    } catch (error) {
        next(createError(403, "Please authenticate using a valid token!"));
    }
};

module.exports = verifyToken;