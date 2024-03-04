import TuileFilm from '../TuileFilm/TuileFilm';
import Filtre from '../Filtre/Filtre';
import './ListeFilms.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function ListeFilms(props) 
{
  // console.log(props);

  // useState fait un rendu dès que l'état changé 
  const [listeFilms, setListeFilms] = useState([]);

  // const [urlListeFilms, setUrlListeFilms] = useState('data/titre-asc.json');
  const [urlListeFilms, setUrlListeFilms] = useState('https://cadriel-front.onrender.com/films');

  const [filtre, SetFiltre] = useState();
  /**
   * Fait un appel à la base de données suite au changement de listFilms
   */ 
  useEffect(()=>
  {
    fetch(urlListeFilms)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setListeFilms(data);
      } )
  // [] executer seulement dans la première rendu
  // [urlListeFilms] executer chaque fois 'urlListeFilms' se change
  }, [urlListeFilms]);


  
  /**
   * Gère l'url de l'API
   * @param {String} nouveauUrl 
  */
  function handleUrl(nouveauUrl)
  {
   setUrlListeFilms(() => nouveauUrl)
  }

  function handleFiltre(nouveauFiltre)
  {
    SetFiltre(() => nouveauFiltre)
  }


  /**
   * Création des tuilesFilm
   */
  const tuilesFilm = listeFilms.map((film, index)=>
  {
    return  <Link key={index} data={film} to={`/film/${film.id}`}  className="liste__tuile">
              <TuileFilm key={index} data={film} urlListeFilms={urlListeFilms}/>
            </Link>
  })
  
  return (
    <main>
      <div>
        <p className='tri'><span className='btn btn-dark'>Trier par</span> <span>{filtre}</span></p>
        <Filtre handleUrl={handleUrl} handleFiltre={handleFiltre}/>
      </div>

      <div className="liste" >
        {tuilesFilm}
      </div>

    </main>
  );
}

export default ListeFilms;