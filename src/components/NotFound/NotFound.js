import './NotFound.css';


function NotFound()
{
    return (
         <div className='notFound pt-xxl pb-xxl pl-xxl pr-xxl'>
            <span className='notFound__code'>404</span>
            <p className='notFound__description'>Page non trouvé</p>
         </div>
   );
}

export default NotFound;