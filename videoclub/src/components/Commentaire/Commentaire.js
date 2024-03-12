import {useContext } from 'react';
import { AppContext} from '../App/App';
import './Commentaire.css';

function Commentaire(props) 
{
    const context = useContext(AppContext);

    // Soumettre la note à la BD
    let aCommentaires=[];


    /**
     * Enregistrer le commentaire a la BD
     * @param {HTMLElement} e 
     */
    async function soumettreCommentaire(e)
    {
        e.preventDefault();

        let inputCommentaire =e.target.commentaire.value;

        // Si le champ est saisi
        if(inputCommentaire !== undefined && inputCommentaire !== '')
        {
            // Si c'est pas le première commentaire
            if(props.commentaires) aCommentaires = props.commentaires;

            aCommentaires.push({ commentaire: inputCommentaire, usager: context.usager});
            // enregistrer le commentaire dans la BD
            props.appelAsync({commentaires: aCommentaires});
        }
        // reinitialiser le champ
        e.target.reset();
    }

    return (
        <form className='commenter' onSubmit={soumettreCommentaire}>
            <textarea className='commenter__textarea' name="commentaire" placeholder='Ajouter votre commentaire' rows="8"></textarea>
            <button className="btn btn-dark">Commenter</button>
        </form>
    );
}

export default Commentaire;