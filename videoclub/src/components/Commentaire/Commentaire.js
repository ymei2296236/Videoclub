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
        if(inputCommentaire !== undefined && inputCommentaire !== '')
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
        <form className='commentaire' onSubmit={soumettreCommentaire}>
            <div className='commentaire__titre'>Commenter</div>

            <textarea className='commentaire__textarea' name="commentaire" placeholder='Ajouter votre commentaire' cols="3" rows="8"></textarea>
            <div className='commentaire__btns'> 
                <button className="btn btn-secondary">Annuler</button>
                <button className="btn btn-secondary">Soumettre</button>
            </div>
        </form>
    );
}

export default Commentaire;