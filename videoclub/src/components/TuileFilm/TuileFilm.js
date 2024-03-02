import './TuileFilm.css';


function TuileFilm(props) {

  return (
       <article>
        <div className="liste__containerImg">
          <img src={`img/${props.data.titreVignette}`} alt={props.data.titre}/>
        </div>

        <div className="liste__info">
          <h2>{props.data.titre}</h2> 
          <p>
            {props.urlListeFilms === 'https://cadriel-front.onrender.com/films?tri=annee' || props.urlListeFilms === 'https://cadriel-front.onrender.com/films?tri=annee&ordre=desc' ? props.data.annee : ''}
            {props.urlListeFilms === 'https://cadriel-front.onrender.com/films?tri=realisation' || props.urlListeFilms === 'https://cadriel-front.onrender.com/films?tri=realisation&ordre=desc' ? props.data.realisation : ''}
          </p> 
        </div>
       </article>
  );
}

export default TuileFilm;