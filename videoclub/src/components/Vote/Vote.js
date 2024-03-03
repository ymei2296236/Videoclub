import './Vote.css';
import { useState } from 'react';


function Vote(props) 
{
    // Tracer le changement d'état de vote
    const [vote, setVote] = useState();

    // Récupère la valeur de vote
    function voter(e)
    {
        setVote(() => e.target.value);
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
        return <label key={ index }><input type="radio" name="vote" value={ note } onClick={ voter } /> { note }</label>
    })

    return (
        <div>
            { domNotes }
            <button onClick={ soumettreNote }>Voter</button>
      </div>
  );
}

export default Vote;