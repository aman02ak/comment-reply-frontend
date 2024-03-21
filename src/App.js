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

  const sortedComments = sortedByDate
    ? [...comments].sort((a, b) => new Date(b.date) - new Date(a.date))
    : comments;

  return (
    <div className='main-container'>
      <div className='main-thread'>
        <CommentForm 
          addNewComment={addNewComment}
          parentID={null}
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
          />
        </div>
      </div>
    </div>
  )
}

export default App