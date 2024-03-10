import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext} from '../App/App';
import './Entete.css';

 
function Entete(props) 
{
  const context = useContext(AppContext);


  return (
    <header className='entete__container'>

      <nav className='entete__nav'>

        <NavLink to="/" className="btn btn-primary">Accueil</NavLink>

        <NavLink to="/liste-films" className="btn btn-primary">Films</NavLink>

        {context.usager?
        <div className='entete__menu'>
          <NavLink to="/admin" className="btn btn-primary">Admin</NavLink>
          <button className="btn btn-primary" onClick={props.handleLogout}>Logout</button> 
        </div>
        : '' }


      </nav>

      {!context.usager?
      <form className='entete__form' onSubmit={props.handleLogin}>
        <input type="text" name="usager" placeholder="Nom de l'usager"></input>
        <button className="btn btn-secondary">Login</button>
      </form>
      : ''}

    </header>
  );
}

export default Entete;