import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchOnePost} from '../../store/postsThunks';
import {selectorOnePost, selectorOnePostLoading} from '../../store/postsSlice';
import Spinner from '../../components/Spinner/Spinner';
import {API_URL} from '../../constants';
import imageChat from '../../assets/images/chat.png';
import dayjs from 'dayjs';
import CommentItem from '../../components/Comments/CommentItem';

const Post = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectorOnePost);
  const loading = useAppSelector(selectorOnePostLoading);
  const postImage = imageChat;

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  return (
    <div className='mt-5'>
      {loading && (<div className='text-center'><Spinner /></div>)}
      {post && (
        <div className='d-flex flex-column mt-4'>
          <div className='d-flex gap-5 align-items-center'>
            <img className='rounded-4' style={{width: '200px', maxHeight: '200px'}} src={post.post.image ? (`${API_URL}/${post.post.image}`) : (postImage)} alt={post.post.title}/>
            <div>
              <h2>{post.post.title}</h2>
              <span>At: {dayjs(post.post.datetime).format('DD.MM.YYYY HH:mm')} by {post.post.user.username}</span>
            </div>
          </div>
          {post.post.description && (
            <div className='my-4'>
              <h4 className='text-center'>Content:</h4>
              <p className='mb-0 mt-2'>{post.post.description}</p>
            </div>
          )}
          <div>
            <h4 className='text-center'>Comments</h4>
            {post.comments.length > 0 ? (
              (post.comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              )))
            ) : (
              <h2 className='text-center'>Коминтариев нет</h2>
            )}
          </div>
        </div>
      )}
      {!loading && !post && <h3 className="mt-5 text-center">There is no such post</h3>}
    </div>
  );
};

export default Post;