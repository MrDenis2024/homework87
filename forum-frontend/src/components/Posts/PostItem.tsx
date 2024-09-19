import React from 'react';
import {PostWithCount} from '../../types';
import imageChat from '../../assets/images/chat.png';
import {API_URL} from '../../constants';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

interface Props {
  post: PostWithCount;
}

const PostItem: React.FC<Props> = ({post}) => {
  let postImage = imageChat;

  if(post.image) {
    postImage = `${API_URL}/${post.image}`;
  }

  return (
    <div className='d-flex align-items-center border border-3 border-info-subtle mb-3 p-3'>
      <img className='rounded-4 col-3' style={{width: '100px', maxHeight: '100px'}} src={postImage} alt={post.title}/>
      <div className='col-10 ms-5'>
        <div>
          <span>{dayjs(post.datetime).format('DD.MM.YYYY HH:mm')}</span>
          <span className='ms-1'>by {post.user.username}</span>
        </div>
        <Link to={`/post/${post._id}`} className='text-decoration-none' ><h4>{post.title}</h4></Link>
      </div>
    </div>
  );
};

export default PostItem;