import { React, useState } from 'react';
import CommentForm from './CommentForm';
import ViewComment from './ViewComment';

import './App.css';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function App() {
  const [comments, updateComments] = useState([]);
  const [sortedByDate, setSortedByDate] = useState(false);

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

      updateComments([...comments]);
    }else{
      // reply on parent thread
      const parentComment = comments.find((comment) => comment.id === parentID);
      const replyComment = parentComment.replies.find((comment) => comment.id === commentID);
      replyComment.name = data.name;
      replyComment.text = data.text;
      replyComment.date = data.date;

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
          <span>Sort By: Date and Time</span>
          {
            sortedByDate ? 
            <ArrowDownwardIcon onClick={handleSort}/> 
            : <ArrowUpwardIcon onClick={handleSort}/>
          }
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