import './Film.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Film() 
{
  const {id} = useParams();
  const urlFilm = `https://cadriel-front.onrender.com/films/${id}`;
  const [film, setFilm] = useState([]);

  const genres = film.genres?.map((genre, index)=>{
    return  <small key={index}>{genre} | </small>
  })

  useEffect(()=>
  {
    fetch(urlFilm)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setFilm(data);
      } )
  }, [urlFilm]);



  return (

    <main className="film">
      <h2>Détails du film</h2>
      <div>
        <div className="film__img">
          <img src={`../img/${film.titreVignette}`} alt={film.titre}/>
        </div>
        <h2>{film.titre}</h2>
        <p>{film.realisation}</p>
        <p>{genres}</p>
        <p>{film.annee}</p>
      </div>
  </main>


  );
}

export default Film;