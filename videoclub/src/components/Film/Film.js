import './Film.css';
import { useParams } from 'react-router-dom';

function Film(props) {

  const {id} = useParams();
  
  return (
    <div>
      <h2>Id : {id}</h2>
      {/* <h2>{props.data.titre}</h2>
      <p>{props.data.realisateur}</p>
      <p>{props.data.annee}</p> */}
    </div>
  );
}

export default Film;