import './NotFound.css';
import { NavLink } from 'react-router-dom';

function NotFound()
{
    return (
         <div>
            <h1>404</h1>
            <NavLink to="/"><p> Accueil </p></NavLink>
         </div>
   );
}

export default NotFound;