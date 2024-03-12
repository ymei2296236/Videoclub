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

        {context.usager?
        <div className='entete__menu'>
          <NavLink to="/admin" className="btn btn-primary">{context.usager}</NavLink>
          <button className="btn btn-primary" onClick={props.handleLogout}>Logout</button> 
        </div>
        : '' }
      </nav>

      {!context.usager?
      <form className='entete__form gap-sm' onSubmit={props.handleLogin}>
        <input type="text" name="usager" className='entete__input pl-xs pr-xs' placeholder="Nom de l'usager"></input>
        <button className="btn btn-secondary">Login</button>
      </form>
      : ''}

    </header>
  );
}

export default Entete;