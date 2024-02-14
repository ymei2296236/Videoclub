import { useState } from 'react';
import './Compteur.css';

function Compteur(props) {

    // console.log(props);

  const[compteur, setCompteur] = useState(props.valeurInitiale); 

  /**
   * Decremente le total du compteur de un
   */
  function decrement(e)
  {
    // console.log(e.target);
    // console.log('decrement');
    setCompteur((valeurActuelle) => valeurActuelle - 1);
    props.handleTotal(-1);
  }

  /**
   * Increment le total du compteur de un
   */
  function increment()
  {
    console.log('increment');
    setCompteur((valeurActuelle) => valeurActuelle + 1);
    props.handleTotal(1);

  }

  /**
   * Réintialise le total du compteur à 0
   */
  function reinitialise()
  {
    console.log('reinitialise');
    setCompteur(0);
    props.handleTotal(-compteur);

  }

  return (
    // il faut avoir un conteneur 
    <div className='compteur'>
      <p>{compteur}</p>
      <div>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reinitialise}>Réinitialiser</button>
      </div>
    </div>
  );
}

export default Compteur;
