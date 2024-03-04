import './Vote.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';


function Vote(props) 
{
    const elStar = <FontAwesomeIcon icon={faStarOutlined} size="lg" style={{color: "#ffc259"}} />;
    const elStarActive = <FontAwesomeIcon icon={faStarSolid} size="lg" style={{color: "#ffc259"}} />;

    // Tracer le changement d'état de vote
    const [vote, setVote] = useState();

    // Récupère la valeur de vote
    function voter(e)
    {
        setVote(() => e.target.value);
        props.handleVote(e);
    }

    // Soumettre la note à la BD
    let aNotes =[];

    async function soumettreNote()
    {
        // Si la note choisie est valide
        if (vote !== undefined)
        {
            // Si c'est la première note
            if(!props.notes)
            {
                aNotes.push(parseInt(vote));
            }
            else
            {
                aNotes = props.notes;
                aNotes.push(parseInt(vote));
            }

            props.appelAsync({notes: aNotes});
        }
    }

    // Créer le dom des notes
    const notes = [1, 2, 3, 4, 5];
      
    const domNotes = notes.map((note, index)=>{

        return <label className='votes__item' key={ index }> {note}<input type="radio" name="vote" value={ note } onClick={(e) => {voter(e)}} data-js-vote/> {props.vote === note? elStarActive : elStar}</label>

    })

    return (
        <div className='votes'>
            {/* <div className='votes__titre'>Voter</div> */}
            <div className='votes__stars'>
            { domNotes }


            </div>
            <div className='votes__btns'> 
                <button onClick={ soumettreNote } className="btn btn-secondary">Voter</button>
            </div>
        </div>
  );
}

export default Vote;