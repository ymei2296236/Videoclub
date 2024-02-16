import { useState } from 'react';
import './Total.css';

function Total(props) {

    // const [total, setTotal] = useState(aValeursInitiales.reduce((a, b) => a + b, 0))

    // function totalCompteur(valeurCompteur)
    // {
    //   setTotal((totalActuel) => totalActuel + valeurCompteur);
    // }
    
 
  return (
      <div className='total'>
        <p><small>Total : </small>{props.total}</p>
      </div>
  );
}

export default Total;
