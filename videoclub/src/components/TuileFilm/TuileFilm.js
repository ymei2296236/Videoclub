import './TuileFilm.css';


function TuileFilm(props) {

  return (
       <article>
        <div>
          <img src={`img/${props.data.titreVignette}`} alt={props.data.titre}/>
        </div>
        <h2>{props.data.titre}</h2> 
        <p>
          {props.urlListeFilms == 'data/annee-asc.json' || props.urlListeFilms == 'data/annee-desc.json' ? props.data.annee : ''}
          {props.urlListeFilms == 'data/realisation-asc.json' || props.urlListeFilms == 'data/realisation-desc.json' ? props.data.realisation : ''}
        </p> 
       </article>
  );
}

export default TuileFilm;