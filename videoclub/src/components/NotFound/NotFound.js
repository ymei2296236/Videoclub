import './NotFound.css';
import { NavLink } from 'react-router-dom';

function NotFound()
{
    return (
         <div className='notFound'>
            <span className='notFound__code'>404</span>
            <p className='notFound__description'>Page non trouvé</p>
         </div>
   );
}

export default NotFound;