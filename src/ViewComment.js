import React from 'react';
import './ViewComment.css';

import DeleteIcon from '@mui/icons-material/Delete';

function ViewComment({ sortedComments }) {
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
                        <div className='section-container-thread'>
                            <div className='section-container-thread-header'>
                                <p>{comment.name}</p>
                                <p>{parentCommentDate ? parentCommentDate : new Date(comment.date).toLocaleString()}</p>
                            </div>
                            <p className='section-container-thread-text'>{comment.text}</p>
                            <div className='section-container-thread-action-button'>
                                <span>Reply</span>
                                <span>Edit</span>
                            </div>
                            
                            <div className='section-container-thread-delete-button'><DeleteIcon /></div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ViewComment;