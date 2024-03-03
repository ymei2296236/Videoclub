import { NavLink } from 'react-router-dom';
import './Entete.css';
import { AppContext} from '../App/App';
import  { useContext } from 'react';

 
function Entete(props) 
{
  const context = useContext(AppContext);

  // console.log(props);

  return (
    <header className='entete__container'>

      <nav className='entete__nav'>

        <NavLink to="/"><h1> Video Club </h1></NavLink>

        <div className='entete__menu'>
          <NavLink to="/liste-films" className="btn btn-primary">Films</NavLink>
          {/* {props.logging.estLog? <NavLink to="/admin"><h2>Admin</h2></NavLink>: '' } */}
          {context.estLog?
            <NavLink to="/admin" className="btn btn-primary">Admin</NavLink>
          : '' }
        </div>
      </nav>

      {!context.estLog?
        <form className='entete__form' onSubmit={props.handleLogin}>
          <input type="text" name="usager" placeholder="nom de l'usager"></input>
          <button className="btn btn-secondary">Login</button>
        </form>
      : ''}

    </header>
  );
}

export default Entete;