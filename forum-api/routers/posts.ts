import express from "express";
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';
import Post from '../models/Post';
import Comment from '../models/Comment';

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({datetime: -1});
    const countComment = await Promise.all(posts.map(async (post) => {
      const count = await Comment.countDocuments({post: post._id});
      return {
        ...post.toObject(),
        countComment: count,
      }
    }));

    return res.send(countComment);
  } catch (error) {
    return next(error);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post === null) {
      return res.status(404).send({error: 'Post not found'});
    }

    const comments = await Comment.find({post: req.params.id}).populate('user', 'username');

    const result = {
      post,
      comments,
    }

    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

postsRouter.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
  try {
    const newPost = new Post({
      user: req.user?._id,
      title: req.body.title,
      description: req.body.description ? req.body.description : null,
      image: req.file ? req.file.filename : null,
      datetime: new Date(),
    });

    await newPost.save();
    return res.send(newPost);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default postsRouter;