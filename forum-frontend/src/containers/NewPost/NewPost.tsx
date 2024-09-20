import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorUser} from '../../store/usersSlice';
import {Navigate, useNavigate} from 'react-router-dom';
import {selectorCreatePostError, selectorCreatePostLoading} from '../../store/postsSlice';
import {PostMutation} from '../../types';
import {toast} from 'react-toastify';
import {createPost} from '../../store/postsThunks';
import PostForm from '../../components/Forms/PostForm';

const NewPost = () => {
  const user = useAppSelector(selectorUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectorCreatePostLoading);
  const error = useAppSelector(selectorCreatePostError);

  const onFormSubmit = async (post: PostMutation) => {
    try {
      await dispatch(createPost(post)).unwrap();
      navigate('/');
      toast.success('Post successfully created');
    } catch (e) {
      toast.error('Error creating Post');
    }
  };

  return (
    <>
      {user ? (
        <>
          <PostForm onSubmit={onFormSubmit} loading={loading} error={error} />
        </>
      ) : (
        <Navigate to='/login'/>
      )}
    </>
  );
};

export default NewPost;