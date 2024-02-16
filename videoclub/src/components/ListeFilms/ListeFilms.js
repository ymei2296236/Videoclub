import TuileFilm from '../TuileFilm/TuileFilm';
import { NavLink } from 'react-router-dom';
import './ListeFilms.css';

function ListeFilms() {

  const listeFilms = [
    { titre:'Film 1', realisateur: 'Billy', annee:'2024' },
    { titre:'Film 2', realisateur: 'Willy', annee:'2000' },
    { titre:'Film 3', realisateur: 'Milly', annee:'1999' }
  ];

  const tuilesFilm = listeFilms.map((film, index)=>{
    return <NavLink key={index} to="#"><TuileFilm key={index} data={film} /></NavLink>

    // return <TuileFilm key={index} data={film} />
  })

  return (
    <main>
      <h2>Liste des films</h2>
      <div>
        {tuilesFilm}
      </div>
    </main>
  );
}

export default ListeFilms;