import React, { useState } from 'react';
import { OutlinedInput, Button } from '@mui/material';
import './CommentForm.css';

// Function to generate a unique ID for comments and replies
const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function CommentForm({ 
    addNewComment, 
    parentID,
    closeComment,
    closeCommentAction
}) {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [comment, setComment] = useState('');
    const [isCommentValid, setIsCommentValid] = useState(true);

    const resetState = () => {
        setName('');
        setIsNameValid(true);
        setComment('');
        setIsCommentValid(true);
    };
    const updateName = (e) => {
        setName(e.target.value);
        setIsNameValid(true);
    };
    const updateComment = (e) => {
        setComment(e.target.value);
        setIsCommentValid(true);
    };
    const validateName = (text) => {
        var regName = /^[a-zA-Z ]+$/;
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
            const newCommentWithDate = {
                id: generateId(),
                name: name,
                text: comment,
                date: new Date().toISOString()
            };

            // adding this comment to all comments
            addNewComment(newCommentWithDate, parentID);
            // resent current state
            resetState();
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
            {
                closeComment ?
                <Button variant="contained" color="error" onClick={closeCommentAction}>CLOSE</Button>
                : null
            }
            <Button variant="contained" onClick={handleSubmit}>POST</Button>
        </div>
    </div>
  )
}

export default CommentForm;