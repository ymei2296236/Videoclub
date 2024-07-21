import { motion } from 'framer-motion';
import './Accueil.css';
import accueil from './Accueil.json';

function Accueil() 
{
  // Bouler les paragraphes pour creer le dom
  const donnees = accueil.map((donnee, index) => 
  {
    return <p className='mt-sm' key={index}> {donnee} </p>
  })

  // Definir les parametres de l'animation
  const transition = {duration: 0.3, ease: 'easeInOut'};

  const variant = 
  { 
    hidden:{ opacity: 0, y:25 },
    visible:{ opacity: 1, y:0, transition },
    exit:{ opacity: 0, y:25, transition },
  };

  return (
    <motion.main
      key='accueil'
      initial='hidden' 
      animate='visible'
      exit='exit'
      variants={variant}
      className={'accueil pt-sm pb-sm pl-lg pr-lg'}
    >
      <div>
        {donnees}
      </div>
    </motion.main>
  );
}

export default Accueil;