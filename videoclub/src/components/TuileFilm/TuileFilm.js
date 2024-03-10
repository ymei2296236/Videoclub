import './TuileFilm.css';


function TuileFilm(props) 
{
  return (
       <article>
        
        <div className="tuile__img">
          <img src={`img/${props.data.titreVignette}`} alt={props.data.titre}/>
        </div>

        <div className="liste__info">
          <h2>{props.data.titre}</h2> 
          <p>
            {props.filtreActif === 'Années (plus récent)' || props.filtreActif === 'Années (moins récent)' ? props.data.annee : ''}
            {props.filtreActif === 'Nom du réalisateur (A-Z)' || props.filtreActif === 'Nom du réalisateur (Z-A)' ? props.data.realisation : ''}
          </p> 
        </div>

       </article>
  );
}

export default TuileFilm;