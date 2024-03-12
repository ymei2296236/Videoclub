import './Filtre.css';


function Filtre(props) 
{
    /**
     * Creer le dom des filtres 
     */
    const filtres =
    [
        'Années (moins récent)',
        'Années (plus récent)',
        'Nom du film (A-Z)',
        'Nom du film (Z-A)',
        'Nom du réalisateur (A-Z)',
        'Nom du réalisateur (Z-A)'
    ];
    
    const domFiltres = filtres.map((element, index) => 
    {
        return  <label key={index} className="filtre-item pt-xs pb-xs pl-md pr-md" data-js-filtre={element} onClick={(e)=>{filtre(e)}}>
                    {element}
                    <input type="radio" name="filtre"/> 
                </label>
    });

    
    /**
     * Récupère la valeur du filtre cliqué
     * @param {HTMLElement} e 
     */    
    function filtre(e)
    {
        let filtre = e.currentTarget.dataset.jsFiltre;

        switch(filtre)
        {
            case 'Nom du film (A-Z)' : 
                props.handleFiltres('Nom du film (A-Z)', 'https://cadriel-front.onrender.com/films?tri=titre');
                break;
            case 'Nom du film (Z-A)' : 
                props.handleFiltres('Nom du film (Z-A)', 'https://cadriel-front.onrender.com/films?tri=titre&ordre=desc');
                break;
            case 'Nom du réalisateur (A-Z)' : 
                props.handleFiltres('Nom du réalisateur (A-Z)', 'https://cadriel-front.onrender.com/films?tri=realisation');
                break;
            case 'Nom du réalisateur (Z-A)' : 
                props.handleFiltres('Nom du réalisateur (Z-A)' ,'https://cadriel-front.onrender.com/films?tri=realisation&ordre=desc');
                break;
            case 'Années (plus récent)' : 
                props.handleFiltres('Années (plus récent)', 'https://cadriel-front.onrender.com/films?tri=annee&ordre=desc');
                break;
            default:
                props.handleFiltres('Années (moins récent)', 'https://cadriel-front.onrender.com/films?tri=annee');
        }
    } 


    return (
        <div>
            <p className='tri pt-sm pb-sm pl-xs gap-sm' >
                <span 
                className='tri__titre ml-sm'>
                    Trier par
                </span> 
                <span data-testid="filtreActif">{props.filtreActif}</span>
            </p>

            <ul className="filtre ">
                { domFiltres }
            </ul>
        </div>
    );
}

export default Filtre;