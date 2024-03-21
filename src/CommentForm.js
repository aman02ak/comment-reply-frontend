import React, { useState, useEffect } from 'react';
import { OutlinedInput, Button } from '@mui/material';
import './CommentForm.css';

// Function to generate a unique ID for comments and replies
const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function CommentForm({
    isEditForm,
    addNewComment, 
    parentID,
    closeComment,
    closeCommentAction,
    editData
}) {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [comment, setComment] = useState('');
    const [isCommentValid, setIsCommentValid] = useState(true);

    useEffect(() => {
        if(isEditForm && editData){
            setName(editData?.name);
            setComment(editData?.text);
        }
    }, [isEditForm, editData]);

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
                date: new Date().toISOString(),
                isCommentEdited: isEditForm
            };

            // adding this comment to all comments
            addNewComment(newCommentWithDate, parentID);
            // resent current state
            resetState();
        }
    }
  return (
    <div className='comment-form'>
        <header className='comment-form-header'>{isEditForm ? 'Edit Comment' : 'Comment'}</header>
        <section className='comment-form-input'>
            <OutlinedInput 
                className={`comment-form-name ${isEditForm ? 'not-editable' : null}`}
                placeholder='Name'
                value={name}
                onChange={updateName} 
                disabled={isEditForm}  
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
                rows={3}
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
            <Button variant="contained" onClick={handleSubmit}>{isEditForm ? 'UPDATE' : 'POST'}</Button>
        </div>
    </div>
  )
}

export default CommentForm;