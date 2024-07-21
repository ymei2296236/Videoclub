import './Filtre.css';


function Filtre(props) 
{
    /**
     * Creer le dom des filtres 
     */
    const filtres =
    [    
        {
            filtre: 'Années (moins récent)',
            url:  'https://cadriel-front.onrender.com/films?tri=annee'
        },
        {
            filtre: 'Années (plus récent)',
            url:  'https://cadriel-front.onrender.com/films?tri=annee&ordre=desc'
        },
        {
            filtre: 'Nom du film (A-Z)',
            url:  'https://cadriel-front.onrender.com/films?tri=titre'
        },
        {
            filtre: 'Nom du film (Z-A)',
            url:  'https://cadriel-front.onrender.com/films?tri=titre&ordre=desc'
        },
        {
            filtre: 'Nom du réalisateur (A-Z)',
            url:  'https://cadriel-front.onrender.com/films?tri=realisation'
        },
        {
            filtre: 'Nom du réalisateur (Z-A)',
            url:  'https://cadriel-front.onrender.com/films?tri=realisation&ordre=desc'
        }
    ];

    
    const domFiltres = filtres.map((element, index) => 
    {
        return  <label key={index} className="filtre-item pt-xs pb-xs pl-md pr-md" data-js-filtre={element.filtre} onClick={(e)=>{gereFiltre(e)}}>
                    {element.filtre}
                    <input type="radio" name="filtre"/> 
                </label>
    });

    
    /**
     * Récupère la valeur du filtre cliqué
     * @param {HTMLElement} e 
     */    
    function gereFiltre(e)
    {
        let filtre = e.currentTarget.dataset.jsFiltre;

        filtres.forEach(element => 
        {
            if(filtre === element.filtre)
            {
                props.handleFiltres(element.filtre, element.url);
            }
        });
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