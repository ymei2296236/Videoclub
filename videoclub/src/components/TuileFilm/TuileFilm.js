import './TuileFilm.css';
// import listeFilms from '../ListeFilms/listeFilms.json';
// import Film from '../Film/Film';
// import { Link } from 'react-router-dom';

function TuileFilm(props) {


  // const film = ((listeFilms)=>{
  //   return <Film key={props.data.id} data={listeFilms[props.data.id]} />;
  // })

  return (
    <div>
        <h2>{props.data.titre}</h2>
        <p>{props.data.realisateur}</p>
        <p>{props.data.annee}</p>
    </div>
  );
}

export default TuileFilm;