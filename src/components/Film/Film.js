import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { motion} from 'framer-motion';
import { AppContext} from '../App/App';
import Vote from '../Vote/Vote';
import Commentaire from '../Commentaire/Commentaire';
import './Film.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';


function Film() 
{
  const context = useContext(AppContext);

  //Recuperer l'id du film
  const {id} = useParams();
  // const urlFilm = `https://cadriel-front.onrender.com/films/${id}`;
  const urlFilm = `https://cadriel-front.onrender.com/films/${id}`;
  
  /**
   * Afficher les infos du film par son id au chargement de la page
   */
  useEffect(()=>
  {
    fetch(urlFilm)
    .then((response) => response.json())
    .then((data) => updateFilm(data))
  }, [urlFilm]);
  
  
  // Declarer l'etat initial de film
  const [film, setFilm] = useState({});
    
  // Créer le dom des genres du film 
  const genres = film.genres?.map((genre, index)=>{
    return  <small className='genre pt-xxs pb-xxs pl-xs pr-xs mr-xs' key={index}>{genre} </small>
  })

  // Creer le dom des commentaires du film
  const domCommentaires = film.commentaires?.map((commentaire, index)=>{
    return <p key={index}><span className='bold'>{commentaire.usager} </span> : <span>{commentaire.commentaire} </span> </p>
  });

  // Declarer l'etat initial des votes d'un films
  const [moyenne, setMoyenne] = useState(0);
  const [nbVotes, setNbVotes] = useState(0);
  

  /**
   * Mettre à jour le film
   * @param {object} data 
  */

  function updateFilm(data)
  {
    // Mettre à jour les infos du film  
    setFilm(data);

    // Gérer l'affichage des votes
    let noteTotale = data.notes;

    if (noteTotale)        
    {
      let noteMoyenne = (noteTotale.reduce((a, b) => a+b, 0)/ noteTotale.length).toFixed(2), // Référence : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
          nbVotes = noteTotale.length;

      setMoyenne(noteMoyenne);
      setNbVotes(nbVotes);
    }
  }

  // Declarer l'etat initial de vote(etoiles)
  const [voteActive, setVoteActive] = useState();
  
  
  /**
   * Recupere la valeur de note saisie pour gerer le style d'etoile dans le composant Vote
   * @param {chiffre} valeur
  */

  function handleStyleVote(valeur='')
  {
    setVoteActive(parseInt(valeur));
  }


  /**
   * Appel async pour modifier et reafficher un film  
   * @param {object} data 
   */
  async function appelAsync(data)
  {
    const oOptions = 
    {
        method: 'PUT',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    // PUT pour modifier le film 
    let putFilm = await fetch(data.url, oOptions),
    // GET pour reaffichier le film 
        getFilm = await fetch(urlFilm);

    Promise.all([putFilm, getFilm])
        .then(respone => respone[1].json())
        .then((data) => updateFilm(data))  
  }


  /**
   * Definir les parametres defauts de transition
   */
  const transition = 
  { 
    duration: 0.5, 
    ease: 'easeInOut'
  }; 

  const variant = 
  { 
    hidden:{ opacity: 0, x:-40 },
    visible:{ opacity: 1, x:0, transition },
    exit:{ opacity: 0, x:-40, transition },
  };
  

  return (
    <main className="film">

      <div className='film__container gap-sm'>
        <motion.div 
        key='film__img'
        initial='hidden' 
        animate='visible'
        exit='exit'
        variants={variant}
        className="film__img">
          <img src={`/img/${film.titreVignette}`} alt={film.titre}/>
        </motion.div>

        <div className="film__infos pt-lg pd-lg pr-sm pl-sm gap-xs">
          <h1>{film.titre} <span className='annee'>({film.annee})</span></h1>

          <div className='vote gap-xxs'>
            <FontAwesomeIcon icon={faStarSolid} size="lg" style={{color: "#ffc259",}} />
            <span className='bold' data-testid="moyenne">{moyenne}/5,</span>
            <span data-testid="nbVotes"> {nbVotes} { nbVotes === 1 || nbVotes === 0 ? 'vote' : 'votes' }</span>
          </div>

          <p><span className='bold'>Réalisateur : </span>{film.realisation}</p>
          <p>{film.description}</p>
          <p className='genres pt-xs pd-xs'>{genres}</p>

          <Vote notes={film.notes} appelAsync={appelAsync} voteActive={voteActive} handleStyleVote={handleStyleVote}/>
        </div>

      </div>

      <div className='film__bgImg' style={{backgroundImage:`url(/img/${film.titreVignette})`, opacity: 0.05}}>
      </div>

      <div className='film__commentaires pt-sm pb-sm pl-sm pr-sm gap-xl'>
        {context.role? 
          <Commentaire commentaires={film.commentaires} appelAsync={appelAsync}/>
        : ''}
        <div className='film__listeCommentaires pt-sm pb-sm gap-sm'>
          {film.commentaires? <h2>Commentaires</h2> : ''}
          {film.commentaires? domCommentaires : ''}
        </div>
      </div>

  </main>
  );
}

export default Film;