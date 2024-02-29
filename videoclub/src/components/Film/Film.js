import './Film.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Vote from '../Vote/Vote';


function Film() 
{
  // Afficher les infos du film par son id au chargement de la page
  const {id} = useParams();
  const urlFilm = `https://cadriel-front.onrender.com/films/${id}`;
  // const urlFilm = `data/titre-asc.json/${id}`; 

  useEffect(()=>
  {
    fetch(urlFilm)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        handleFilm(data);
      })
  }, [urlFilm]);

  // Tracer le changement d'état du film
  const [film, setFilm] = useState({});

  // Tracer le changement d'état des stats des votes
  const [moyenne, setMoyenne] = useState('Aucun vote enregistré');
  const [nbVotes, setnbVotes] = useState(0);
  
  // Créer le dom des genres
  const genres = film.genres?.map((genre, index)=>{
    return  <small key={index}>{genre} | </small>
  })

  // Mettre à jour le film
  function handleFilm(data)
  {
    // Mettre à jour les infos du film  
    setFilm(data);

    // Gérer l'affichage des votes
    let noteTotale = data.notes;
    // console.log(noteTotale);

    if (noteTotale)        
    {
      // Référence : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
      let noteMoyenne = (noteTotale.reduce((a, b) => a+b, 0)/ noteTotale.length).toFixed(2),
        nbVotes = noteTotale.length;

      setMoyenne(noteMoyenne);
      setnbVotes(nbVotes);
    }
  }


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

        <p>Moyenne : {moyenne} </p>
        <p>Nombre de { nbVotes === 1 ? 'vote' : 'votes' }  : {nbVotes} </p>
        <Vote notes={film.notes} urlFilm={urlFilm} handleFilm={handleFilm}/>
      </div>
  </main>
  );
}

export default Film;