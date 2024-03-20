import { React, useState } from 'react';
import CommentForm from './CommentForm';
import './App.css';

function App() {
  const [comments, updateComment] = [];


  return (
    <div>
      <CommentForm />
    </div>
  )
}

export default App