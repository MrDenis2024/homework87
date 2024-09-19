import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorFetchPostsLoading, selectorPosts} from '../../store/postsSlice';
import {useEffect} from 'react';
import {fetchPosts} from '../../store/postsThunks';
import PostItem from '../../components/Posts/PostItem';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectorPosts);
  const loading = useAppSelector(selectorFetchPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className='mt-5'>
      {loading && (<div className='text-center'><Spinner /></div>)}
      {posts.length > 0 && (
        posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))
      )}
      {!loading && posts.length === 0 &&  <h3 className='text-center'>There are no posts</h3>}
    </div>
  );
};

export default Home;