import express from "express";
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const newComment = new Comment({
      user: req.user?._id,
      post: req.query.post,
      comment: req.body.comment,
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

export default commentsRouter;