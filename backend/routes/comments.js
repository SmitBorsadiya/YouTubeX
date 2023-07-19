const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken.js');
const createError = require('../error.js');
const Comment = require('../models/Comment.js');
const Video = require('../models/Video.js');

//Add Comment
router.post('/', verifyToken, async (req, resp, next) => {
    const newComment = new Comment({ ...req.body, UserId: req.user.id });
    try {
        const savedComment = await newComment.save();
        resp.status(200).json(savedComment)
    } catch (error) {
        next(error)
    }
})

//Delete Comment
router.delete('/:id', verifyToken, async (req, resp, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.user.id === comment.UserId || req.user.id === video.UserId) {
            await Comment.findByIdAndDelete(req.params.id);
            resp.status(200).json("The comment has been deleted.")
        } else {
            return next(createError(403, "You can only delete your comment!"))
        }
    } catch (error) {
        next(error)
    }
})

//Get Comments
router.get('/:videoId', async (req, resp, next) => {
    try {
        const comments = await Comment.find({videoId:req.params.videoId});
        resp.status(200).json(comments);
    } catch (error) {
        next(error)
    }
})

module.exports = router;