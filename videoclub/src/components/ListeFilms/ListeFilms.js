import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimate, stagger } from 'framer-motion';
import TuileFilm from '../TuileFilm/TuileFilm';
import Filtre from '../Filtre/Filtre';
import './ListeFilms.css';



function ListeFilms() 
{
  const [listeFilms, setListeFilms] = useState([]); // useState fait un rendu dès que l'état changé 
  const [urlListeFilms, setUrlListeFilms] = useState('https://cadriel-front.onrender.com/films');
  const [estCharge, setEstCharge] = useState(false);

  /**
   * Fait un appel à la base de données suite au changement de listFilms
   */ 
  useEffect(()=>
  {
    fetch(urlListeFilms)
      .then((response) => response.json())
      .then((data) => 
      {
        setListeFilms(data);
        setEstCharge(true);
      })
  }, [urlListeFilms]); // [] executer seulement a la première rendu; [urlListeFilms] executer a chaque fois 'urlListeFilms' se change

  
  /**
   * Gere les filtres
   */ 
  const [filtreActif, setFiltreActif] = useState();

  function handleFiltres(nouveauFiltre, nouveauUrl)
  {
    setFiltreActif(nouveauFiltre);
    setUrlListeFilms(nouveauUrl);
  }

  /**
   * Création des tuilesFilm
   */
  const tuilesFilm = listeFilms.map((film, index)=>
  {
    return  <Link key={index} data={film} to={`/film/${film.id}`}  className="tuile">
              <TuileFilm key={index} data={film} filtreActif={filtreActif}/>
            </Link>
  })



  // definir les parametres defauts de transition
  const transition = 
  { 
    duration: 0.5, 
    ease: 'easeInOut'
  }; 

  const variant = 
  { 
    hidden:{ opacity: 0, y:25 },
    visible:{ opacity: 1, y:0, transition },
    exit:{ opacity: 0, y:25, transition },
  };

  
  return (
    <main className='catalogue'>
      <div>
        {/* <p className='catalogue__tri'><span className='btn btn-dark'>Trier par</span> <span>{filtre}</span></p> */}
        <motion.div
          key='filtre'
          initial={{ opacity: 0, x:-25 }} 
          animate= {{ opacity: 1, x:0, transition }}
          exit={{ opacity: 0, x:-25, transition }}
        >
          <Filtre handleFiltres={handleFiltres} filtreActif={filtreActif} />
        </motion.div>
      </div>

      {estCharge ? 
      (
        <motion.div
          key='liste-film'
          initial='hidden' 
          animate='visible'
          exit='exit'
          variants={variant}
          className="catalogue__liste" 
        >
          
          {tuilesFilm}
        </motion.div>
      ) : ('')}
    </main>
  );
}

export default ListeFilms;