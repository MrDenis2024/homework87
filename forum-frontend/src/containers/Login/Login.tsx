import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorLoginError, selectorLoginLoading} from '../../store/usersSlice';
import React, {useState} from 'react';
import {LoginMutation} from '../../types';
import {login} from '../../store/usersThunks';
import {toast} from 'react-toastify';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorLoginError);
  const loading = useAppSelector(selectorLoginLoading);

  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
      toast.success('Login was successful');
    } catch (e) {
      toast.error('There was a login error');
    }
  };

  return (
    <form className='mt-5 w-25 mx-auto' onSubmit={submitFormHandler}>
      <h3 className='text-center'>Login</h3>
      {error && (
        <div className='alert alert-danger d-flex align-items-center'>
          <i className="bi bi-exclamation-circle" style={{color: 'red'}}></i>
          <p className='ms-2 mb-0'>{error.error}</p>
        </div>
      )}
      <div className='form-group mb-3'>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' className='form-control' value={state.username} onChange={inputChangeHandler} required autoComplete='current-username' />
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' className='form-control' value={state.password} onChange={inputChangeHandler} required autoComplete='new-password' />
      </div>
      <button type='submit' className='btn btn-primary w-100 mb-3' disabled={loading}>{loading && <ButtonSpinner />}Login</button>
      <Link to='/register'>Or registration</Link>
    </form>
  );
};

export default Login;