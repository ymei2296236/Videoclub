import './Accueil.css';
import accueil from './accueil.json';

function Accueil() {

  const donnees = accueil.map((donnee, index) => 
  {
    return <p key={index}> {donnee} </p>
  })

  return (
    <main>
        <div>
        {donnees}
      </div>
    </main>
  );
}

export default Accueil;