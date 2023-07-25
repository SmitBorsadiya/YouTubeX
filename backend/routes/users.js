const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken.js');
const createError = require('../error.js');
const User = require('../models/User.js');
const Video = require('../models/Video.js');

//Update user
router.put('/:id', verifyToken, async (req, resp, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            resp.status(200).json(updatedUser)
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can only update your account!"));
    }
});

//delete user
router.delete('/:id', verifyToken, async (req, resp, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            resp.status(200).json("User has been Deleted")
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can only delete your account"));
    }
});

//get a user
router.get('/find/:id', async (req, resp, next) => {
    try {
        const user = await User.findById(req.params.id);
        resp.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

//subscribe a user
router.put('/sub/:id', verifyToken, async (req, resp, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        resp.status(200).json("Subscription successfull")
    } catch (error) {
        next(error);
    }
});

//unsubscribe a user
router.put('/unsub/:id', verifyToken, async (req, resp, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        resp.status(200).json("Unsubscription successfull")
    } catch (error) {
        next(error);
    }
});

//like a video
router.put('/like/:videoId', verifyToken, async (req, resp, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        resp.status(200).json("The video has been liked.")
    } catch (error) {
        next(error);
    }
});

//dislike a video
router.put('/dislike/:videoId', verifyToken, async (req, resp, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        resp.status(200).json("The video has been disliked.")
    } catch (error) {
        next(error);
    }
});

module.exports = router;