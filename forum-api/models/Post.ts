import mongoose, {Types} from 'mongoose';
import {PostFields} from '../types';
import User from './User';

const Schema = mongoose.Schema;

const PostSchema = new Schema<PostFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator(value?: string) {
        return !!(value || this.image);
      },
      message: 'Description is required if image is not provided!',
    },
  },
  image: {
    type: String,
    validate: {
      validator(value?: string) {
        return !!(value || this.description);
      },
      message: 'Image is required if description is not provided!',
    },
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model<PostFields>('Post', PostSchema);

export default Post;