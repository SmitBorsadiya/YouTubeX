const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js')
const createError = require('../error.js');
const jwt = require('jsonwebtoken')
const jwtKey = "smitims";

// Create a user
router.post('/signup', async (req, resp, next) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        resp.status(200).send("User has been created");
    } catch (error) {
        next(error);
    }
})

// Sign in
router.post('/signin', async (req, resp, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(createError(404, "User not found"))
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return next(createError(400, "Please try to login with correct credentials"))
        }

        const token = jwt.sign({ id: user._id }, jwtKey);
        const { password, ...others } = user._doc;

        resp.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);

    } catch (error) {
        next(error);
        resp.status(500).send("Internal Server Error");
    }
})

// Google auth
router.post("/google", async (req, resp, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, jwtKey);
            resp.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, jwtKey);
            resp.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;