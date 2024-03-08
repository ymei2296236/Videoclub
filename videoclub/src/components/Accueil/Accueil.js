import { motion } from 'framer-motion';

import './Accueil.css';
import accueil from './Accueil.json';

function Accueil() {

  const donnees = accueil.map((donnee, index) => 
  {
    return <p key={index}> {donnee} </p>
  })

  const transition = { duration: 0.3, ease: 'easeInOut'};

  const variant = { 
    hidden:{ opacity: 0, y:25 },
    visible:{ opacity: 1, y:0, transition },
    exit:{ opacity: 0, y:25, transition },
  }

  return (
    <motion.main
      key='accueil'
      initial='hidden' 
      animate='visible'
      exit='exit'
      variants={variant}
      className='accueil'
    >
      <div>
        {donnees}
      </div>

    </motion.main>
  );
}

export default Accueil;