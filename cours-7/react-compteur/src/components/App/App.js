import { useState } from 'react';
import Compteur from '../Compteur/Compteur';
import Entete from '../Entete/Entete';
import Total from '../Total/Total';
import './App.css';

function App() {


  const aValeursInitiales = [0, 0, 2, 0];

  // Calcule le total initial
  const [total, setTotal] = useState(aValeursInitiales.reduce((a, b) => a + b, 0))

  // Calcule le nouveau total 
  function handleTotal(valeurCompteur)
  {
    setTotal((totalActuel) => totalActuel + valeurCompteur);

  }

  // Crée et insère les compteurs avec les valeurs initiales et le total
  const compteurs = aValeursInitiales.map((valeurInitiale, index) =>
  {
    return <Compteur key={index} valeurInitiale={valeurInitiale} handleTotal={handleTotal} />
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
