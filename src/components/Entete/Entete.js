import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext} from '../App/App';
import './Entete.css';

 
function Entete(props) 
{
  const context = useContext(AppContext);

  return (
    <header className='entete__container pt-sm pb-sm pl-sm pr-sm'>

      <nav className='entete__nav mr-lg'>
        <NavLink to="/" className="btn btn-primary ">Accueil</NavLink>

        <NavLink to="/liste-films" className="btn btn-primary">Films</NavLink>

        <div className='entete__menu'>
        {context.role === 'admin'?
          <NavLink to="/admin" className="btn btn-primary">Admin</NavLink>
        : ''}
        </div>


      </nav>

      {!context.role?
      <form className='entete__form gap-sm' onSubmit={props.handleLogin}>
        <input type="text" name="courriel" className='entete__input pl-xs pr-xs' placeholder="admin"></input>
        <input type="password" name="mdp" className='entete__input pl-xs pr-xs' placeholder="Mot de passe"></input>
        <button className="btn btn-secondary">Connexion</button>
      </form>
      : 
      <div>

        <span className="pl-xs mr-sm">Bonjour, {context.courriel}</span>
        <button className="btn btn-primary" onClick={props.handleLogout}>Logout</button> 

      </div>
    }

    </header>
  );
}

export default Entete;