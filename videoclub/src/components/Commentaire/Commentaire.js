import {useContext } from 'react';
import { AppContext} from '../App/App';
import './Commentaire.css';

function Commentaire(props) 
{
    const context = useContext(AppContext);

    // Soumettre la note à la BD
    let aCommentaires=[];

    async function soumettreCommentaire(e)
    {
        e.preventDefault();

        let inputCommentaire =e.target.commentaire.value;

        e.target.reset();

        // Si le champ est saisi
        if(inputCommentaire !== undefined && inputCommentaire !== '')
        {
            // Si c'est la première note
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
        <form className='commenter' onSubmit={soumettreCommentaire}>
            {/* <div className='commentaire__titre'>Commenter</div> */}

            <textarea className='commenter__textarea' name="commentaire" placeholder='Ajouter votre commentaire' rows="8"></textarea>
            <button className="btn btn-dark">Commenter</button>
        </form>
    );
}

export default Commentaire;