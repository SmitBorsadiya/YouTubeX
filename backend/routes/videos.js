const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const createError = require('../error');
const Video = require('../models/Video');
const User = require('../models/User');

//Add Video
router.post('/', verifyToken, async (req, resp, next) => {
    const newVideo = new Video({ UserId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        resp.status(200).json(savedVideo);
    } catch (error) {
        next(error);
    }
});

//Update Video
router.put('/:id', verifyToken, async (req, resp, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found!"));
        }
        if (req.user.id === video.UserId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            resp.status(200).json(updatedVideo);
        } else {
            return next(createError(403, "You can only update your video!"));
        }
    } catch (error) {
        next(error);
    }
});

//Delete Video
router.delete('/:id', verifyToken, async (req, resp, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found!"));
        }
        if (req.user.id === video.UserId) {
            await Video.findByIdAndDelete(req.params.id);
            resp.status(200).json("Video deleted successfully!");
        } else {
            return next(createError(403, "You can only delete your video!"));
        }
    } catch (error) {
        next(error);
    }
});

//Get Video
router.get('/find/:id', async (req, resp, next) => {
    try {
        const video = await Video.findById(req.params.id);
        resp.status(200).json(video);
    } catch (error) {
        next(error);
    }
});

//Add View
router.get('/view/:id', async (req, resp, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { view: 1 }
        });
        resp.status(200).json("The view has been increased.");
    } catch (error) {
        next(error);
    }
});

//Random Video
router.get('/random', async (req, resp, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        resp.status(200).json(videos);
    } catch (error) {
        next(error);
    }
});

//Trending Video
router.get('/trend', async (req, resp, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        resp.status(200).json(videos);
    } catch (error) {
        next(error);
    }
});

//Subscribers Video
router.get('/sub', verifyToken, async (req, resp, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({ UserId: channelId });
            })
        );

        resp.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        next(error);
    }
});

//Get video by Tags
router.get('/tags', async (req, resp, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);  // '$in' method checks whether the tags inside it is present or not.
        resp.status(200).json(videos);
    } catch (error) {
        next(error);
    }
})

//Get video by Title
router.get('/search', async (req, resp, next) => {
    const query = req.query.title;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" }
        }).limit(40);
        resp.status(200).json(videos);
    } catch (error) {
        next(error);
    }
})

module.exports = router;