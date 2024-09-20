import React from 'react';
import {Comment} from '../../types';
import dayjs from 'dayjs';

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({comment}) => {
  return (
    <div className='border rounded-3 border-info-subtle mb-3 p-3'>
      <p className='mb-0'>Author: <strong>{comment.user.username}</strong> at {dayjs(comment.datetime).format('DD.MM.YYYY HH:mm')}</p>
      <p className='mb-0 mt-2'>Wrote: {comment.comment}</p>
    </div>
  );
};

export default CommentItem;