import { React, useState } from 'react';
import './ViewComment.css';
import CommentForm from './CommentForm';

import DeleteIcon from '@mui/icons-material/Delete';

function ViewComment({ 
    sortedComments, 
    handleDelete,
    addNewComment,
    editExistingComment
}) {
    const [responseToParentID, setResponseToParentID] = useState(-1);
    const [editCommentFormID, setEditCommentFormID] = useState(-1);
    const [editCommentFormParentID, setEditCommentFormParentID] = useState(-1);

    const handleEditComment = (id, parentID) => {
        setEditCommentFormID(id);
        setEditCommentFormParentID(parentID);
    }
    const handleClickReply = (id) => {
        setResponseToParentID(id);
    }
    const handleSubmitReply = (newCommentWithDate, parentID) => {
        setResponseToParentID(-1);
        addNewComment(newCommentWithDate, parentID);
    }
    const handleSubmitEditComment = (newCommentWithDate, parentID) => {
        setEditCommentFormID(-1);
        editExistingComment(newCommentWithDate, editCommentFormID, editCommentFormParentID);
    }
  return (
    <div className='section-container'>
        {
            sortedComments.length === 0 ?
            <span>No Comments to display</span>
            : null
        }
        {
            sortedComments.map((comment) => {
                const parentCommentDate = new Date(comment.date).toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit'});
                return(
                    <div key={comment.id} className='section-container-main-thread'>
                        {
                            editCommentFormID === comment.id ?
                            <CommentForm
                                isEditForm={true}
                                addNewComment={handleSubmitEditComment}
                                parentID={null}
                                closeComment={true}
                                closeCommentAction={() => handleEditComment(-1, null)}
                                editData={comment}
                            />
                            : <div className='section-container-thread'>
                                <div className='section-container-thread-header'>
                                    <p>{comment.name}</p>
                                    <p>{parentCommentDate ? parentCommentDate : new Date(comment.date).toLocaleString()}</p>
                                </div>
                                <p className='section-container-thread-text'>{comment.text}</p>
                                <div className='section-container-thread-action-button'>
                                    <span onClick={() => handleClickReply(comment.id)}>Reply</span>
                                    <span onClick={() => {handleEditComment(comment.id, null)}}>Edit</span>
                                </div>
                                
                                <div 
                                    className='section-container-thread-delete-button'
                                    onClick={() => handleDelete(comment.id, null)}    
                                ><DeleteIcon /></div>
                            </div>
                        }
                        <div className='section-container-thread-reply'>
                            {
                                responseToParentID === comment.id ?
                                <div className='section-container-thread-reply-newReply'>
                                    <div className='section-container-thread-reply-newReply-child'>
                                        <CommentForm
                                            isEditForm={false}
                                            addNewComment={handleSubmitReply}
                                            parentID={comment.id}
                                            closeComment={true}
                                            closeCommentAction={() => handleClickReply(-1)}
                                        />
                                    </div>
                                </div>
                                : null
                            }
                            <div className='section-container-thread-reply-content'>
                                {
                                    comment.replies.map((replyComment) => {
                                        const replyCommentDate = new Date(replyComment.date).toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit'});
                                        return (
                                            editCommentFormID === replyComment.id ?
                                                <CommentForm
                                                    isEditForm={true}
                                                    addNewComment={handleSubmitEditComment}
                                                    parentID={comment.id}
                                                    closeComment={true}
                                                    closeCommentAction={() => handleEditComment(-1, -1)}
                                                    editData={replyComment}
                                                />
                                            :<div className='section-container-thread'>
                                                <div className='section-container-thread-header'>
                                                    <p>{replyComment.name}</p>
                                                    <p>{replyCommentDate ? replyCommentDate : new Date(replyComment.date).toLocaleString()}</p>
                                                </div>
                                                <p className='section-container-thread-text'>{replyComment.text}</p>
                                                <div className='section-container-thread-action-button'>
                                                    <span onClick={() => {handleEditComment(replyComment.id, comment.id)}}>Edit</span>
                                                </div>
                                                
                                                <div 
                                                    className='section-container-thread-delete-button'
                                                    onClick={() => handleDelete(replyComment.id, comment.id)}    
                                                ><DeleteIcon /></div>
                                            </div>
                                            
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ViewComment;