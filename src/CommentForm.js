import React, { useState } from 'react';
import { OutlinedInput, Button } from '@mui/material';
import './CommentForm.css';

function CommentForm() {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [comment, setComment] = useState('');
    const [isCommentValid, setIsCommentValid] = useState(true);

    const updateName = (e) => {
        setName(e.target.value);
        setIsNameValid(true);
    };
    const updateComment = (e) => {
        setComment(e.target.value);
        setIsCommentValid(true);
    };
    const validateName = (text) => {
        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        return regName.test(text);
    }
    const validateComment = (text) => {
        return text.length > 0;
    }
    const handleSubmit = () => {
        const tempIsNameValid = validateName(name);
        const tempIsCommentValid = validateComment(comment);
        setIsNameValid(tempIsNameValid);
        setIsCommentValid(tempIsCommentValid);

        if(tempIsNameValid && tempIsCommentValid) {
            // perform submit action
        }
    }
  return (
    <div className='comment-form'>
        <header className='comment-form-header'>Comment</header>
        <section className='comment-form-input'>
            <OutlinedInput 
                className='comment-form-name'
                placeholder='Name'
                value={name}
                onChange={updateName}   
            ></OutlinedInput>
            {
                !isNameValid ?
                <span className='comment-form-input-validate'>
                    Please enter a valid name
                </span>
                : null
            }
            <OutlinedInput 
                className='comment-form-comment'
                placeholder='Comment'
                value={comment}
                onChange={updateComment}
                multiline   
            ></OutlinedInput>
            {
                !isCommentValid ?
                <span className='comment-form-input-validate'>
                    Please enter a valid comment
                </span>
                : null
            }
        </section>
        <div className='comment-form-submit-button'>
            <Button variant="contained" onClick={handleSubmit}>POST</Button>
        </div>
    </div>
  )
}

export default CommentForm;