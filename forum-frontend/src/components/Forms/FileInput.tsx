import React, {useRef, useState} from 'react';
import {ValidationError} from '../../types';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: ValidationError | null;
}

const FileInput: React.FC<Props> = ({onChange, error}) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  return (
    <div  className='form-group mb-4'>
      <div className={`d-flex flex-column  ${getFieldError('image') ? 'is-invalid' : ''}`}>
        <input type='file' style={{display: 'none'}} ref={inputRef} name='image' onChange={onFileChange}/>
        <div className='mb-1'>
          <label htmlFor="image">Image:</label>
        </div>
        <div className='d-flex'>
          <input type="text" id="image" className='form-control w-25' value={filename} onClick={activateInput} readOnly/>
          <button type='button' className='btn btn-primary ms-5' onClick={activateInput}>Browse</button>
        </div>
      </div>
      {getFieldError('image') && (
        <div className="invalid-feedback">
          {getFieldError('image')}
        </div>
      )}
    </div>
  );
};

export default FileInput;