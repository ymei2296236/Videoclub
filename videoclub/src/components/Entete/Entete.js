import { NavLink } from 'react-router-dom';
import './Entete.css';
import { AppContext} from '../App/App';
import  { useContext } from 'react';

 
function Entete(props) 
{
  const context = useContext(AppContext);

  console.log(props);

  return (
    <header>
        <NavLink to="/"><h1> Videoclub </h1></NavLink>
      <nav>
        {/* {props.logging.estLog? <NavLink to="/admin"><h2>Admin</h2></NavLink>: '' } */}
        {context.estLog? <NavLink to="/admin"><h2>Admin</h2></NavLink>: '' }

        <NavLink to="/liste-films"><h2>Liste des films</h2></NavLink>
      </nav>

      <form onSubmit={props.handleLogin}>
        <input type="text" name="usager" placeholder="nom de l'usager"></input>
        <button>Login</button>
      </form>

    </header>
  );
}

export default Entete;