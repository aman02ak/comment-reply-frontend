import { React, useState } from 'react';
import CommentForm from './CommentForm';

import './App.css';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function App() {
  const [comments, updateComment] = [
    {
      name: 'Aman Kumar',
      comment: 'This is how I start this thread'
    }
  ];
  const [isSortedAscending, setIsSortedAscending] = useState(false);

  const updateSortingTechnique = () => {
    setIsSortedAscending(!isSortedAscending);
    // write your logic to sort comments by date
  }
  return (
    <div className='main-container'>
      <div className='main-thread'>
        <CommentForm />
      </div>
      <div className='main-container-section'>
        <div className='main-container-section-sorter'>
          <span>Sort By: Date and Time</span>
          {
            isSortedAscending ? 
            <ArrowDownwardIcon onClick={updateSortingTechnique}/> 
            : <ArrowUpwardIcon onClick={updateSortingTechnique}/>
          }
        </div>
        <div className='main-container-section-content'>

        </div>
      </div>
    </div>
  )
}

export default App