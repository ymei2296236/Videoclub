import TuileFilm from '../TuileFilm/TuileFilm';
import './ListeFilms.css';
import listeFilms from './listeFilms.json';
import { Link } from 'react-router-dom';

function ListeFilms() {

  // const listeFilms = [
  //   { titre:'Film 1', realisateur: 'Billy', annee:'2024' },
  //   { titre:'Film 2', realisateur: 'Willy', annee:'2000' },
  //   { titre:'Film 3', realisateur: 'Milly', annee:'1999' }
  // ];

  const tuilesFilm = listeFilms.map((film, index)=>{
    return  <Link key={index} to={`/film/${film.id}`} activeClassName="active">
              <TuileFilm key={index} data={film} />
            </Link>
    // return <TuileFilm key={index} data={film} />
  })

  return (
    <main>
      <h2>Liste des films</h2>
      {tuilesFilm}
    </main>
  );
}

export default ListeFilms;