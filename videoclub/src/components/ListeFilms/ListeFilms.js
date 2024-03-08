import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TuileFilm from '../TuileFilm/TuileFilm';
import Filtre from '../Filtre/Filtre';
import './ListeFilms.css';



function ListeFilms(props) 
{
  // console.log(props);
  // useState fait un rendu dès que l'état changé 
  const [listeFilms, setListeFilms] = useState([]);
  // const [urlListeFilms, setUrlListeFilms] = useState('data/titre-asc.json');
  const [urlListeFilms, setUrlListeFilms] = useState('https://cadriel-front.onrender.com/films');
  const [filtre, SetFiltre] = useState();
  const [estCharge, setEstCharge] = useState(false);

  const transition = { duration: 0.5, ease: 'easeInOut'};

  const variant = { 
    hidden:{ opacity: 0, y:25 },
    visible:{ opacity: 1, y:0, transition },
    exit:{ opacity: 0, y:25, transition },
  }

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
        setEstCharge(true);
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
    <main className='catalogue'>
      <div>
        {/* <p className='catalogue__tri'><span className='btn btn-dark'>Trier par</span> <span>{filtre}</span></p> */}
        <motion.div
          key='filtre'
          initial={{ opacity: 0, x:-25 }} 
          animate= {{ opacity: 1, x:0, transition }}
          exit={{ opacity: 0, x:-25, transition }}
        >
          <Filtre handleUrl={handleUrl} handleFiltre={handleFiltre} filtre={filtre} />
        </motion.div>
      </div>

      {estCharge ? (

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