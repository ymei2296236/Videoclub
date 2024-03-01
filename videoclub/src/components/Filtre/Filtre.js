import './Filtre.css';


function Filtre(props) 
{
    /**
     * Récupère la valeur du filtre cliqué
     * @param {HTMLElement} e 
     */    
    function filtre(e)
    {
        let filtre = e.target.dataset.jsFiltre;

        switch(filtre)
        {
            case 'titre-asc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=titre');
                break;
            case 'titre-desc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=titre&ordre=desc');
                break;
            case 'realisation-asc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=realisation');
                break;
            case 'realisation-desc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=realisation&ordre=desc');
                break;
            case 'annee-desc' : 
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=annee&ordre=desc');
                break;
            default:
                props.handleUrl('https://cadriel-front.onrender.com/films?tri=annee');
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
        <ul>
            <li data-js-filtre="annee-asc"  onClick={(e)=>{filtre(e); gereActive(e)}}>Années de production (moins récent)</li>
            <li data-js-filtre="annee-desc"  onClick={(e)=>{filtre(e); gereActive(e)}}>Années de production (plus récent)</li>
            <li data-js-filtre="titre-asc" onClick={(e)=>{filtre(e); gereActive(e)}}>Nom du film (A-Z)</li>
            <li data-js-filtre="titre-desc" onClick={(e)=>{filtre(e); gereActive(e)}}>Nom du film (Z-A)</li>
            <li data-js-filtre="realisation-asc" onClick={(e)=>{filtre(e); gereActive(e)}}>Nom du réalisateur(A-Z)</li>
            <li data-js-filtre="realisation-desc"  onClick={(e)=>{filtre(e); gereActive(e)}}>Nom du réalisateur(Z-A)</li>
        </ul>
    );
}

export default Filtre;