import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorRegisterError, selectorRegisterLoading} from '../../store/usersSlice';
import React, {useState} from 'react';
import {RegisterMutation} from '../../types';
import {register} from '../../store/usersThunks';
import {toast} from 'react-toastify';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorRegisterError);
  const loading = useAppSelector(selectorRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

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
      await dispatch(register(state)).unwrap();
      navigate('/');
      toast.success('Registration was successful');
    } catch (e) {
      toast.error('There was a registration error');
    }
  };
  return (
    <form className='mt-5 w-25 mx-auto' onSubmit={submitFormHandler}>
      <h3 className='text-center'>Registration</h3>
      <div className='form-group mb-3'>
        <div className={`${getFieldError('username') ? 'is-invalid' : ''}`}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' className='form-control' value={state.username} onChange={inputChangeHandler} required  autoComplete='new-username' />
        </div>
        {getFieldError('username') && (
          <div className='invalid-feedback'>
            {getFieldError('username')}
          </div>
        )}
      </div>
      <div className='form-group mb-3'>
        <div className={`${getFieldError('password') ? 'is-invalid' : ''}`}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' className='form-control' value={state.password} onChange={inputChangeHandler} required autoComplete='new-password' />
        </div>
        {getFieldError('password') && (
          <div className='invalid-feedback'>
            {getFieldError('password')}
          </div>
        )}
      </div>
      <button type='submit' className='btn btn-primary w-100 mb-3' disabled={loading}>{loading && <ButtonSpinner />} Register</button>
      <Link to='/login'>Already have an account? Login</Link>
    </form>
  );
};

export default Register;