import './Film.css';

function Film(props) {
  return (
    <div>
      <h2>{props.data.titre}</h2>
      <p>{props.data.realisateur}</p>
      <p>{props.data.annee}</p>
    </div>
  );
}

export default Film;