import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import NewPost from './containers/NewPost/NewPost';
import Post from './containers/Post/Post';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new-post' element={<NewPost />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>} />
      </Routes>
    </Layout>
  );
};

export default App;
