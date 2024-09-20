import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const firstUser = new User({
    username: 'Denis',
    password: '123',
  });
  firstUser.generateToken();
  await firstUser.save();

  const secondUser = new User({
    username: 'Anton',
    password: '456',
  });
  secondUser.generateToken();
  await secondUser.save();

  const [firstPost, secondPost] = await Post.create({
    user: firstUser,
    title: 'Новый айфон 16',
    description: 'В ночь с 9 на 10 сентября состоялась главная презентация Apple 2024 года, на которой представили новые модели iPhone. Стоит ли брать данный телефон?',
    image: null,
    datetime: new Date(),
  }, {
    user: secondUser,
    title: 'Веселый кот',
    description: null,
    image: 'fixtures/cat.jpeg',
    datetime: new Date(),
  });

  await Comment.create({
    user: secondUser,
    post: firstPost,
    comment: 'Думаю не стоит брать',
    datetime: new Date(),
  }, {
    user: firstUser,
    post: firstPost,
    comment: 'Сложно ли переходит с Android на IOS?',
    datetime: new Date(),
  }, {
    user: firstUser,
    post: secondPost,
    comment: 'Как звать кота?',
    datetime: new Date(),
  }, {
    user: secondUser,
    post: secondPost,
    comment: 'Красивые глаза!',
    datetime: new Date(),
  });

  await db.close();
};

run().catch(console.error);