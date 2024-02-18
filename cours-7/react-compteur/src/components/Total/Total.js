import './Total.css';

function Total(props) {
 
  return (
      <div className='total'>
        <p><small>Total : </small>{props.total}</p>
      </div>
  );
}

export default Total;
