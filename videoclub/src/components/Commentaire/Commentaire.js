import './Commentaire.css';
import {useContext } from 'react';
import { AppContext} from '../App/App';

function Commentaire(props) 
{
    const context = useContext(AppContext);

    // Soumettre la note à la BD
    let aCommentaires=[];

    async function soumettreCommentaire(e)
    {
        e.preventDefault();
        // console.log(e.target.commentaire.value);

        let inputCommentaire =e.target.commentaire.value;
        e.target.reset();

        // Si c'est la première note
        if(inputCommentaire !== undefined)
        {
            if(!props.commentaires)
            {
                aCommentaires.push({ commentaire: inputCommentaire, usager: context.usager});
            }
            else
            {
                aCommentaires = props.commentaires;
                aCommentaires.push({ commentaire: inputCommentaire, usager: context.usager});
            }

            props.appelAsync({commentaires: aCommentaires});
        }
    }

    return (
        <form onSubmit={soumettreCommentaire}>
            <textarea name="commentaire" placeholder='Ajouter votre commentaire'></textarea>
            <button>Soumettre</button>
        </form>
    );
}

export default Commentaire;