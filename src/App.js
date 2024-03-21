import { React, useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import ViewComment from './ViewComment';

import './App.css';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function App() {
  const [comments, updateComments] = useState([]);
  const [sortedByDate, setSortedByDate] = useState(false);


  useEffect(() => {
    // saving to local storage to prevent data loss on page refresh
    // just one case needs to be handled where we are deleting all of our 
    // comments from local storage - covered in handleDelete
    if(comments.length > 0)
      window.sessionStorage.setItem('myCommentData', JSON.stringify(comments));
    
  }, [comments]);
  useEffect(() => {
    // reading from local storage to local variable
    if(JSON.parse(window.sessionStorage.getItem('myCommentData')))
      updateComments(JSON.parse(window.sessionStorage.getItem('myCommentData')));
  }, []);

  const handleSort = () => {
    setSortedByDate(!sortedByDate);
  };
  const addNewComment = (newComment, parentID) => {
    if(!parentID){
      // no parent, new-thread
      const newParentComment = {
        ...newComment, 
        replies: []
      };
      updateComments((oldComments) => [...oldComments, newParentComment])
    }else{
      // reply on parent thread
      const parentComment = comments.find((comment) => comment.id === parentID);
      parentComment.replies.push(newComment);
      updateComments([...comments]);
    }
  };
  const editExistingComment = (data, commentID, parentID) => {
    if(!parentID){
      // parent comment itself
      const parentComment = comments.find((comment) => comment.id === commentID);
      parentComment.name = data.name;
      parentComment.text = data.text;
      parentComment.date = data.date;
      parentComment.isCommentEdited = data.isCommentEdited;

      updateComments([...comments]);
    }else{
      // reply on parent thread
      const parentComment = comments.find((comment) => comment.id === parentID);
      const replyComment = parentComment.replies.find((comment) => comment.id === commentID);
      replyComment.name = data.name;
      replyComment.text = data.text;
      replyComment.date = data.date;
      replyComment.isCommentEdited = data.isCommentEdited;

      updateComments([...comments]);
    }
  };
  const handleDelete = (id, parentID) => {
    if(!parentID)
      updateComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    else{
      const parentComment = comments.find((comment) => comment.id === parentID);
      parentComment.replies = parentComment.replies.filter((comment) => comment.id !== id);
      updateComments([...comments]);
    }

    // CASE - where all comments are deleted, equating with 1 as it records previous state
    if(comments.length === 1)
      window.sessionStorage.setItem('myCommentData', JSON.stringify([]));
  };

  const sortedComments = sortedByDate
    ? [...comments].sort((a, b) => new Date(b.date) - new Date(a.date))
    : comments;

  return (
    <div className='main-container'>
      <div className='main-thread'>
        <CommentForm 
          isEditForm={false}
          addNewComment={addNewComment}
          parentID={null}
          closeComment={false}
        />
      </div>
      <div className='main-container-section'>
        <div className='main-container-section-sorter'>
          <span onClick={handleSort}>
            Sort By: Date and Time
            {
              sortedByDate ? 
              <ArrowDownwardIcon onClick={handleSort}/> 
              : <ArrowUpwardIcon onClick={handleSort}/>
            }  
          </span>
        </div>
        <div className='main-container-section-content'>
          <ViewComment 
            sortedComments={sortedComments}
            handleDelete={handleDelete}
            addNewComment={addNewComment}
            editExistingComment={editExistingComment}
          />
        </div>
      </div>
    </div>
  )
}

export default App