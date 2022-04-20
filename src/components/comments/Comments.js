import { useState } from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from '../../hooks/hooks/use-http';
import { addComment, getAllComments } from '../../lib/lib/api';
import { useEffect } from 'react';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status } = useHttp(addComment);
  const { 
    sendRequest: getAllCommentsRequest, 
    status: getCommentStatus, 
    data: allComments, 
    error 
  } = useHttp(getAllComments, true);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = (comment) => {
    sendRequest({
      quoteId: props.quoteId,
      commentData: {
        text: comment
      }
    });
    setIsAddingComment(false);

    setTimeout(()=>{
      getAllCommentsRequest(props.quoteId);
    }, 500);
  }

  useEffect(()=>{
    getAllCommentsRequest(props.quoteId);
  }, [sendRequest]);

  let commentListContent = '';

  if(getCommentStatus === 'pending'){
    commentListContent = <div className="centered"><LoadingSpinner/></div> 
  }

  if(error){
    commentListContent = <p style={{color: 'black'}} className="centered focused">{error}</p>
  }

  if(getCommentStatus === 'completed' && allComments && allComments.length === 0){
    commentListContent = <p style={{color: 'black'}} className="centered focused">No comment found.</p>
  }

  if(getCommentStatus === 'completed' && allComments && allComments.length > 0){
    commentListContent = <CommentsList comments={allComments} />
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && status === 'pending' && <div className="centered"><LoadingSpinner/></div>}
      {isAddingComment && <NewCommentForm onAddComment={addCommentHandler} />}
      {/* <p>Comments...</p> */}
      {commentListContent}
    </section>
  );
};

export default Comments;
