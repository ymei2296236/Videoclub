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
    async function soumettreNote()
    {
        let aNotes =[];

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

            const oOptions = 
            {
                method: 'PUT',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({notes: aNotes})
            }

            // PUT pour modifier le champ de notes du film 
            let putNote = await fetch(props.urlFilm, oOptions),
            // GET pour afficher à nouveau les votes 
                getFilm = await fetch(props.urlFilm);
        
            Promise.all([putNote, getFilm])
                .then(respone => respone[1].json())
                .then((data) => {
                //   console.log(data);
                    props.handleFilm(data);
                })
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