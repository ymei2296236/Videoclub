import './Film.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Vote from '../Vote/Vote';
import { AppContext} from '../App/App';
import Commentaire from '../Commentaire/Commentaire';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

function Film() 
{
  const context = useContext(AppContext);

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
  const [moyenne, setMoyenne] = useState(0);
  const [nbVotes, setNbVotes] = useState(0);

  const [vote, setVote] = useState();
  
  // Créer le dom des genres
  const genres = film.genres?.map((genre, index)=>{
    return  <small className='genre' key={index}>{genre} </small>
  })

  const domCommentaires = film.commentaires?.map((commentaire, index)=>{
    return <p key={index}><span className='bold'>{commentaire.usager} </span> : <span>{commentaire.commentaire} </span> </p>
  });

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
      setNbVotes(nbVotes);
    }
  }

  function handleVote(e)
  {
    setVote(parseInt(e.target.value));
  }

  async function appelAsync(data)
  {
    const oOptions = 
    {
        method: 'PUT',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        // body: JSON.stringify(data)
    }

    // PUT pour modifier le champ de notes du film 
    let putCommentaire = await fetch(urlFilm, oOptions),
    // GET pour afficher à nouveau les votes 
        getFilm = await fetch(urlFilm);

    Promise.all([putCommentaire, getFilm])
        .then(respone => respone[1].json())
        .then((data) => {
        //   console.log(data);
        handleFilm(data);
        })      
    }


  return (
    <main className="film">
        {/* <div className='film__container' style={{backgroundImage:"url(" + `../img/${film.titreVignette}` + ")", opacity: 0.2}}> */}
        <div className='film__container'>

          <div className="film__img">
            <img src={`../img/${film.titreVignette}`} alt={film.titre}/>
          </div>

          <div className="film__infos">
            <h1>{film.titre} <span className='annee'>({film.annee})</span></h1>

            <div className='vote'>
              <FontAwesomeIcon icon={faStarSolid} size="lg" style={{color: "#ffc259",}} />
              <span className='bold'>{moyenne}</span> 
              | {nbVotes} { nbVotes === 1 || nbVotes === 0 ? 'vote' : 'votes' } 
            </div>
          
            <p><span className='bold'>Réalisateur : </span>{film.realisation}</p>
            <p>{film.description}</p>
            <p className='genres'>{genres}</p>

            <Vote notes={film.notes} urlFilm={urlFilm} handleFilm={handleFilm} appelAsync={appelAsync} vote={vote} handleVote={handleVote}/>
          </div>

        </div>

        
        <div className='film__commentaires'>

          {context.usager? 
            <Commentaire commentaires={film.commentaires} urlFilm={urlFilm} handleFilm={handleFilm} appelAsync={appelAsync}/>
          : ''}

          <div className='film__commentaire-list'>
            {film.commentaires? <h2>Commentaires</h2> : ''}
            {film.commentaires? domCommentaires : ''}
          </div>
        </div>

  </main>
  );
}

export default Film;