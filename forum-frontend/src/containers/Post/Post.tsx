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
import {selectorUser} from '../../store/usersSlice';
import CommentForm from '../../components/Forms/CommentForm';
import {selectorComments, selectorCreateCommentLoading, selectorFetchCommentLoading} from '../../store/commentsSlice';
import {CommentMutation} from '../../types';
import {createComment, fetchComments} from '../../store/commentsThunks';
import {toast} from 'react-toastify';

const Post = () => {
  const {id} = useParams() as {id: string};
  const user = useAppSelector(selectorUser);
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectorOnePost);
  const loading = useAppSelector(selectorOnePostLoading);
  const createCommentLoading = useAppSelector(selectorCreateCommentLoading);
  const comments = useAppSelector(selectorComments);
  const fetchCommentsLoading = useAppSelector(selectorFetchCommentLoading);
  const postImage = imageChat;

  useEffect(() => {
    dispatch(fetchOnePost(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const onFormSubmit = async (comment: CommentMutation) => {
    try {
      await dispatch(createComment(comment)).unwrap();
      dispatch(fetchComments(id));
      toast.success('Comment successfully created');
    } catch (e) {
      toast.error('Error creating comment');
    }
  };

  return (
    <div className='mt-5'>
      {loading && (<div className='text-center'><Spinner /></div>)}
      {post && (
        <div className='d-flex flex-column mt-4'>
          <div className='d-flex gap-5 align-items-center'>
            <img className='rounded-4' style={{width: '200px', maxHeight: '200px'}} src={post.image ? (`${API_URL}/${post.image}`) : (postImage)} alt={post.title}/>
            <div>
              <h2>{post.title}</h2>
              <span>At: {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')} by {post.user.username}</span>
            </div>
          </div>
          {post.description && (
            <div className='my-4'>
              <h4 className='text-center'>Content:</h4>
              <p className='mb-0 mt-2'>{post.description}</p>
            </div>
          )}
          <div>
            {user && (
              <CommentForm postId={id} createCommentLoading={createCommentLoading} onSubmitComment={onFormSubmit} />
            )}
            {fetchCommentsLoading && (<div className='text-center'><Spinner /></div>)}
            <h4 className='text-center'>Comments</h4>
            {comments.length > 0 ? (
              (comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              )))
            ) : (
              <h2 className='text-center'>No comments</h2>
            )}
          </div>
        </div>
      )}
      {!loading && !post && <h3 className="mt-5 text-center">There is no such post</h3>}
    </div>
  );
};

export default Post;