import React, {useState} from 'react';
import {CommentMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  postId: string;
  onSubmitComment: (comment: CommentMutation) => void;
  createCommentLoading: boolean;
}

const CommentForm: React.FC<Props> = ({postId, onSubmitComment, createCommentLoading}) => {
  const [comment, setComment] = useState<CommentMutation>({
    post: postId,
    comment: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitComment({...comment});

    setComment((prevState) => ({
      ...prevState,
      comment: '',
    }));
  };

  return (
    <form className='mt-2 mb-5' onSubmit={submitFormHandler}>
      <h5 className='text-center'>Add comment</h5>
      <div className='form-group gap-2 mb-3 d-flex align-items-center justify-content-center'>
        <label htmlFor="comment" className='col-1'>Comment:</label>
        <textarea id="comment" name='comment' cols={150} rows={2} className="border border-primary-subtle col-8"
                  required
                  placeholder="Enter your comment" value={comment.comment} onChange={inputChangeHandler}></textarea>
        <button type='submit' className='btn btn-success col-1' disabled={createCommentLoading}>{createCommentLoading &&
          <ButtonSpinner/>} Add
        </button>
      </div>
    </form>
  );
};

export default CommentForm;