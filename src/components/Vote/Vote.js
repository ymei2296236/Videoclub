import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './Vote.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';


function Vote(props) 
{  
    const {id} = useParams();
    const elStar = <FontAwesomeIcon icon={faStarOutlined} size="lg" style={{color: "#ffc259"}} />;
    const elStarActive = <FontAwesomeIcon icon={faStarSolid} size="lg" style={{color: "#ffc259"}} />;
    // Tracer le changement de vote
    const [vote, setVote] = useState();
    const url = `https://cadriel-front.onrender.com/films/${id}/vote`;


    /**
     * Gerer la valeur et le style de vote 
     * @param {HTMLElement} e 
     */
    function voter(e)
    {
        // Récupère la valeur de vote
        setVote(e.target.value);

        // ajouter style active a l'etoile clique
        props.handleStyleVote(e.target.value);
    }

    // Soumettre la note à la BD
    let aNotes =[];


    /**
     * Enregistrer la vote et reinitialiser la valeur et le style
     */
    async function soumettreNote()
    {
        // Si la note choisie est valide
        if (vote !== undefined)
        {
            // Si c'est pas la première note, recupere les donnees de notes de la BD
            if(props.notes) aNotes = props.notes;
          
            aNotes.push(parseInt(vote));
            // enregistrer la vote dans la BD
            props.appelAsync({notes: aNotes, url: url});

            // réinitialiser le style des etoiles
            props.handleStyleVote();
            // réinitaliser la vote
            setVote();
        }
    }

    /**
     * Créer le dom des notes
     */
    const notes = [1, 2, 3, 4, 5];
      
    const domNotes = notes.map((note, index)=>
    {
        return <label className='votes__item' key={ index }> 
                    {note}
                    <input type="radio" name="notes" value={ note } onClick={(e) => {voter(e)}}/> 
                    {props.voteActive === note? elStarActive : elStar}
                </label>
    })


    return (
        <div className='votes mt-sm gap-sm'>
            <div className='votes__stars gap-lg mr-lg'>
            { domNotes }
            </div>
            <div>
                <button  onClick={ soumettreNote } className="btn btn-dark">Voter</button>
            </div>
        </div>
    );
}

export default Vote;