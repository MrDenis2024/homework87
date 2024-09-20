import express from "express";
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const newComment = new Comment({
      user: req.user?._id,
      post: req.body.post,
      comment: req.body.comment,
      datetime: new Date(),
    });

    await newComment.save();
    return res.send(newComment);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

commentsRouter.get('/', async (req, res, next) => {
  try {
    const postId = req.query.post;
    const comment = await Comment.find({post: postId}).sort({datetime: -1}).populate('user', 'username');

    return res.send(comment);
  } catch (error) {
    return next(error);
  }
});

export default commentsRouter;