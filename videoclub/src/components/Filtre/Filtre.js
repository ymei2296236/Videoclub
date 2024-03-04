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
        // console.log(e.currentTarget.dataset.jsFiltre);

        switch(filtre)
        {
            case 'titre-asc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=titre');
                props.handleFiltre('Nom du film (A-Z)');
                break;
            case 'titre-desc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=titre&ordre=desc');
                props.handleFiltre('Nom du film (Z-A)');
                
                break;
                case 'realisation-asc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=realisation');
                props.handleFiltre('Nom du réalisateur(A-Z)');
                break;
            case 'realisation-desc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=realisation&ordre=desc');
                props.handleFiltre('Nom du réalisateur(Z-A))');
                break;
            case 'annee-desc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=annee&ordre=desc');
                props.handleFiltre('Années (plus récent)');
                break;
            default:
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=annee');
                props.handleFiltre('Années (moins récent)');

        }
    }

    /**
     * Gère le style du filtre actif
     * @param {HTMLElement} e 
     */
    function gereActive(e)
    {
        let filtre = e.target.dataset.jsFiltre,
            urlsActive = document.querySelectorAll('[data-js-filtre]');

        for (let i = 0, l = urlsActive.length; i < l; i++) 
        {
            if(urlsActive[i].dataset.jsFiltre !== filtre) urlsActive[i].classList.remove('active');
        }

        e.target.classList.add('active');
    }

    return (
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
                Nom du réalisateur(A-Z)
                    <input type="radio" name="filtre"/>
                
            </label>
            <label className="filtre-item" data-js-filtre="realisation-desc" onClick={(e)=>{filtre(e); gereActive(e)}}>
                Nom du réalisateur(Z-A)
                    <input type="radio" name="filtre"/>
                
            </label>
        </ul>
    );
}

export default Filtre;