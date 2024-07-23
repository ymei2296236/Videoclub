import { useParams } from 'react-router-dom';
import {useContext } from 'react';
import { AppContext} from '../App/App';
import './Commentaire.css';

function Commentaire(props) 
{
    const {id} = useParams();
    const context = useContext(AppContext);
    const url = `https://cadriel-front.onrender.com/films/${id}/commentaire`;

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
            aCommentaires.push({ commentaire: inputCommentaire, usager: context.courriel});
            // enregistrer le commentaire dans la BD
            props.appelAsync({commentaires: aCommentaires, url: url});
        }
        // reinitialiser le champ
        e.target.reset();
    }

    return (
        <form className='commenter mt-sm gap-sm' onSubmit={soumettreCommentaire}>
            <textarea className='commenter__input pt-xxs pb-xxs pl-xxs pr-xxs' name="commentaire" placeholder='Ajouter votre commentaire' rows="8"></textarea>
            <button className="btn btn-dark">Commenter</button>
        </form>
    );
}

export default Commentaire;