import { useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { Fragment } from 'react';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [authorError, setAuthorError] = useState(null);
  const [textError, setTextError] = useState(null);

  async function submitFormHandler(event) {
    event.preventDefault();
    setAuthorError(null);
    setTextError(null);
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if(enteredAuthor.trim() === ''){
      setAuthorError('This field is Required');
    }

    if(enteredText.trim() === ''){
      setTextError('This field is Required');
    }

    if(enteredAuthor.trim() !== '' && enteredText.trim() !== ''){
      props.onAddQuote({ author: enteredAuthor, text: enteredText });
    }
  }

  const formFocusHandler = () => {
    setIsEntering(true);
  }

  const buttonClickHandler = () => {
    setIsEntering(false);
  }

  return (
    <Fragment>
      <Prompt 
        when={isEntering}
        message="Are you Sure! You want to leave page?"
      />
      <Card>
        <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' ref={authorInputRef} />
            {authorError && <p style={{color: 'red', marginTop: '5px'}}>{authorError}</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef}></textarea>
            {textError && <p style={{color: 'red', marginTop: '5px'}}>{textError}</p>}
          </div>
          <div className={classes.actions}>
            <button onClick={buttonClickHandler} className='btn'>Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
