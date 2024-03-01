import './Film.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Vote from '../Vote/Vote';
import { AppContext} from '../App/App';


function Film(props) 
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

  let blocAjoutCommentaire;

  if(context.estLog)
  {
    blocAjoutCommentaire = <form onSubmit={soumettreCommentaire}>
                              <textarea placeholder='Ajouter votre commentaire'></textarea>
                              <button>Soumettre</button>
                          </form>
  }

    // Soumettre la note à la BD
    async function soumettreCommentaire(e)
    {
      e.preventDefault();
      console.log(e.target);

      let aCommentaires;

      // Si c'est la première note
      if(!film.aCommentaires)
      {
          aCommentaires = [{ commentaire: 'Je suis un commentaire', usager: context.usager}];
      }
      else
      {
          aCommentaires = film.aCommentaires;
          aCommentaires.push({ commentaire: 'Je suis un commentaire', usager: context.usager});
      }

      // appelAsync()
      const oOptions = 
      {
          method: 'PUT',
          headers: 
          {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({commentaires: aCommentaires})
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
              setFilm(data);
          })
        
    }


  return (
    <main className="film">

      <div>
        <div className="film__img">
          <img src={`../img/${film.titreVignette}`} alt={film.titre}/>
        </div>

        <h1>{film.titre}</h1>
        <p>{film.realisation}</p>
        <p>{genres}</p>
        <p>{film.annee}</p>

        <p>Moyenne : {moyenne} </p>
        <p>Nombre de { nbVotes === 1 ? 'vote' : 'votes' }  : {nbVotes} </p>
        <Vote notes={film.notes} urlFilm={urlFilm} handleFilm={handleFilm}/>

        {blocAjoutCommentaire}
      </div>
  </main>
  );
}

export default Film;