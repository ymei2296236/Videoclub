import { useState } from 'react';
import Compteur from '../Compteur/Compteur';
import Entete from '../Entete/Entete';
import Total from '../Total/Total';
import './App.css';

function App() {

  const aValeursInitiales = [0, 0, 2, 0];
  const [total, setTotal] = useState(aValeursInitiales.reduce((a, b) => a + b, 0))

  function totalCompteur(valeurCompteur)
  {
    setTotal((totalActuel) => totalActuel + valeurCompteur);
  }

  
  const compteurs = aValeursInitiales.map((valeurInitiale, index) =>
  {
    return <Compteur key={index} valeurInitiale={valeurInitiale} handleTotal={totalCompteur} />
  })
 
  return (
    <>
    <Entete />
    <main>
      {compteurs}
      <Total total={total}/>
    </main>
    </>
  );

}

export default App;
