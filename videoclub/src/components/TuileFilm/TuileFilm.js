import './TuileFilm.css';
// import listeFilms from '../ListeFilms/listeFilms.json';
// import Film from '../Film/Film';
// import { Link } from 'react-router-dom';

function TuileFilm(props) {


  // const film = ((listeFilms)=>{
  //   return <Film key={props.data.id} data={listeFilms[props.data.id]} />;
  // })

  return (
       <article>
        <div>
          <img src={`img/${props.data.titreVignette}`} alt={props.data.titre}/>
        </div>
          <h2>{props.data.titre}</h2> 
       </article>
  );
}

export default TuileFilm;