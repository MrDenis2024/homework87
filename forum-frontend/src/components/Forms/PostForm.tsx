import React, {useState} from 'react';
import {PostMutation, ValidationError,} from '../../types';
import FileInput from './FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (post: PostMutation) => void;
  loading: boolean;
  error: ValidationError | null;
}

const PostForm: React.FC<Props> = ({onSubmit, loading, error}) => {
  const [post, setPost] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...post});
  };

  return (
    <form className='mt-5' onSubmit={submitFormHandler}>
      <h4 className='mb-5 text-center'>Add new post</h4>
      <div className='form-group mb-3 d-flex align-items-center'>
        <label htmlFor='title' className='col-1'>Title</label>
        <input type='text' name='title' id='title' className='form-control' value={post.title} onChange={inputChangeHandler} required/>
      </div>
      <div className='form-group mb-3'>
        <div className={`d-flex align-items-center ${getFieldError('description') ? 'is-invalid' : ''}`}>
          <label htmlFor="description" className="col-1">Description</label>
          <textarea id="description" name="description" cols={150} rows={3} className="border"
                    placeholder="Enter description" value={post.description} onChange={inputChangeHandler}></textarea>
        </div>
        {getFieldError('description') && (
          <div className="invalid-feedback text-end">
            {getFieldError('description')}
          </div>
        )}
      </div>
      <div className="form-group mb-4 d-flex align-items-center">
        <FileInput onChange={fileInputChangeHandler} />
      </div>
      <div className='col-2 d-flex justify-content-end'>
        <button type='submit' className='btn btn-success' disabled={loading}>{loading && <ButtonSpinner />}Save post</button>
      </div>
    </form>
  );
};

export default PostForm;