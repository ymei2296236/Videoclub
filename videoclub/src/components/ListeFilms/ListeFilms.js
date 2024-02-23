import TuileFilm from '../TuileFilm/TuileFilm';
import './ListeFilms.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ListeFilms() {

  const urlListeFilms = 'https://cadriel-front.onrender.com/films';
  // const urlListeFilms = 'https://four1f-node-api.onrender.com/films';
  const [listeFilms, setListeFilms] = useState([]);

  /** demo useEffect */
  // const [etat, setEtat] = useState(true);
  // const [etatTest, setEtatTest] = useState(false);

  // ecoute sur à 'etat'
  // useEffect(()=>
  // {
  //  console.log('rendu');
  // }, [etat]);

  useEffect(()=>
  {
    // console.log('rendu');
    fetch(urlListeFilms)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setListeFilms(data);
      } )
  // [] executer dans la première rendu
  }, []);

  const tuilesFilm = listeFilms.map((film, index)=>{
    return  <Link key={index} data={film} to={`/film/${film.id}`}  className="liste__tuile">
              <TuileFilm key={index} data={film}/>
            </Link>
  })

  return (
    <main>
      {/* <div>
        <button onClick={()=>setEtat(!etat)}> Change état</button>
        {JSON.stringify(etat)}
      </div>

      <div>
        <button onClick={()=>setEtatTest(!etatTest)}> Change état</button>
        {JSON.stringify(etatTest)}
      </div> */}

      <h2>Liste des films</h2>
      <div className="liste" >
        {tuilesFilm}
      </div>
    </main>
  );
}

export default ListeFilms;