
import './Filtre.css';


function Filtre(props) 
{
    /**
     * Récupère la valeur du filtre cliqué
     * @param {HTMLElement} e 
     */    
    function filtre(e)
    {
        let filtre = e.currentTarget.dataset.jsFiltre;

        switch(filtre)
        {
            case 'titre-asc' : 
                props.handleFiltres('Nom du film (A-Z)', 'https://cadriel-front.onrender.com/films?tri=titre');
                break;
            case 'titre-desc' : 
                props.handleFiltres('Nom du film (Z-A)', 'https://cadriel-front.onrender.com/films?tri=titre&ordre=desc');
                
                break;
                case 'realisation-asc' : 
                props.handleFiltres('Nom du réalisateur (A-Z)', 'https://cadriel-front.onrender.com/films?tri=realisation');
                break;
            case 'realisation-desc' : 
                props.handleFiltres('Nom du réalisateur (Z-A)' ,'https://cadriel-front.onrender.com/films?tri=realisation&ordre=desc');
                break;
            case 'annee-desc' : 
                props.handleFiltres('Années (plus récent)', 'https://cadriel-front.onrender.com/films?tri=annee&ordre=desc');
                break;
            default:
                props.handleFiltres('Années (moins récent)', 'https://cadriel-front.onrender.com/films?tri=annee');

        }
    } 

    /**
     * Gère le style du filtre actif
     * @param {HTMLElement} e 
     */
    function gereActive(e)
    {
        let filtreActif = e.target.dataset.jsFiltre,
            urlsFiltres = document.querySelectorAll('[data-js-filtre]');

        for (let i = 0, l = urlsFiltres.length; i < l; i++) 
        {
            if(urlsFiltres[i].dataset.jsFiltre !== filtreActif) urlsFiltres[i].classList.remove('active');
        }
        e.target.classList.add('active');
    }

    return (
        <div>
            <p className='catalogue__tri' ><span className='btn btn-dark'>Trier par</span> <span data-testid="filtreActif">{props.filtreActif}</span></p>

            <ul className="filtre">
                <label className="filtre-item" data-js-filtre="annee-asc" onClick={(e)=>{filtre(e); gereActive(e)}}>
                    Années de production (moins récent)
                        <input type="radio" name="filtre"/> 
                </label>
                <label className="filtre-item" data-js-filtre="annee-desc" onClick={(e)=>{filtre(e); gereActive(e)}}>
                    Années de production (plus récent)
                        <input type="radio" name="filtre"/>   
                </label>
                <label className="filtre-item" data-js-filtre="titre-asc" onClick={(e)=>{filtre(e); gereActive(e)}}>
                    Nom du film (A-Z)
                        <input type="radio" name="filtre"/> 
                </label>
                <label className="filtre-item" data-js-filtre="titre-desc" onClick={(e)=>{filtre(e); gereActive(e)}}>
                    Nom du film (Z-A)
                        <input type="radio" name="filtre"/>  
                </label>
                <label className="filtre-item" data-js-filtre="realisation-asc" onClick={(e)=>{filtre(e); gereActive(e)}}>
                    Nom du réalisateur (A-Z)
                        <input type="radio" name="filtre"/>  
                </label>
                <label className="filtre-item" data-js-filtre="realisation-desc" onClick={(e)=>{filtre(e); gereActive(e)}}>
                    Nom du réalisateur (Z-A)
                        <input type="radio" name="filtre"/>
                </label>
            </ul>
        </div>
    );
}

export default Filtre;