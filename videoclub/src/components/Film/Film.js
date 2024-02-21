import './Film.css';
import { useParams } from 'react-router-dom';
// import TuileFilm from '../TuileFilm/TuileFilm';
import { useEffect, useState } from 'react';


function Film() 
{
  const {id} = useParams();
  const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`;
  const [film, setFilm] = useState([]);
  
  useEffect(()=>
  {
    fetch(urlFilm)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setFilm(data);
      } )
  }, []);



  return (

    <main className="film">
      <h2>Détails du film</h2>
      <div>
        <div className="film__img">
          <img src={`../img/${film.titreVignette}`} alt={film.titre}/>
        </div>
        <h2>{film.titre}</h2>
        <p>{film.realisation}</p>
        <p>{film.annee}</p>
      </div>
  </main>


  );
}

export default Film;