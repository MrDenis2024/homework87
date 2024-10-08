import express from "express";
import usersRouter from './routers/users';
import postsRouter from './routers/posts';
import mongoose from 'mongoose';
import config from './config';
import cors from 'cors';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static("public"));
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);