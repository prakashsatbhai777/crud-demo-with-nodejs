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
        <figcaption>{`- ${props.author}`}</figcaption>
      </figure>
      <div>
        <Link className='btn' to={`${match.url}/${props.id}`}>View</Link>
        &nbsp;<Link className='btn' to={`/edit-quote/${props.id}`}>Edit</Link>
        &nbsp;<button className='btn' style={{fontSize: '16px'}} onClick={deleteButtonClickHandler} >Delete</button>
      </div>
    </li>
  );
};

export default QuoteItem;
