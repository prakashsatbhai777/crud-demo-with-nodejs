import { Link, useRouteMatch } from 'react-router-dom';
import classes from './QuoteItem.module.css';

const QuoteItem = (props) => {
  const deleteButtonClickHandler = () => {
    props.deleteQuote(props.id);
    // const isDelete = confirm("Are you sure? You want to delete Quote?");
    // if(isDelete){
    //   props.deleteQuote(props.id);
    // }
  }
  const match = useRouteMatch();
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className='btn' to={`${match.url}/${props.id}`}>View Fullscreen</Link>
      <button className='btn' style={{fontSize: '16px'}} onClick={deleteButtonClickHandler} >Delete</button>
      {/* <a className='btn'>
        View Fullscreen
      </a> */}
    </li>
  );
};

export default QuoteItem;
