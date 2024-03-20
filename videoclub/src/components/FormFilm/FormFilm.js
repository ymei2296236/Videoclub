import { useState } from "react";
import './FormFilm.css';

function FormFilm()
{
    const dataInitial = {
        annee: "",
        description: "",
        genres: [],
        realisation: "",
        titre: "",
        titreVignette: "vide.jpg",
    };

    const [formData, setFormData] = useState(dataInitial);

    const [formValidity, setFormValidity] = useState('invalid');

    // Ici on pourrait utiliser le useState pour capter les message ed'erreurs

    const [msgErreur, setMsgErreur] = useState();

    /**
     * Détecter la saisie de données 
     * @param {Event} e 
     */
    function onFormDataChange(e)
    {
        try 
        {        
            // const name = e.target.name;
            // const value = e.target.value;
            const {name,value} = e.target;
            
            const estValide = e.target.form.checkValidity()? "valid": "invalid"
            setFormValidity(estValide);
            
            // On clone la donnée dans un nouvel objet
            const donneeModifiees ={...formData,[name]:value };
            // Met à jour la donnée
            setFormData(donneeModifiees);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    async function onFormSubmit(e)
    {
        e.preventDefault();

        // Vérifier si le formulaire est valide
        if(formValidity === 'invalid')
        {
            // reportValidity() returns a boolean value indicating whether all of the inputs in the <form> were valid or not.
            e.target.reportValidity();
        }

        // Récupèrer le token de l'utilisateur connecté
        const token = JSON.parse(localStorage.getItem("logging")).usager;

        // Prépare le donnée
        const data = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "authorization": `Bearer ${token}`,
            },
            body:JSON.stringify(formData),
        }

        // On soumet
        
        // On gère la réponse du formulaire
        const requete = await fetch("http://localhost:3301/films", data);
        
        const reponse = await requete.json();

        if(requete.status === 200)
        {
            // Afficher un message de succès 
            console.log('super');

            // Vider le formulaire
            setFormData(dataInitial);

            // Réinit l'état de validité
            setFormValidity('invalid');
        }
        else
        {
            const msgErreur = reponse.message;
            setMsgErreur(msgErreur);
        }
    }

    return (

        <main>
            <div className="wrapper">
                <h1>Ajouter un film</h1>
                <form className={formValidity} onSubmit={onFormSubmit}>
                    <div className="input-group">
                        <label htmlFor="titre" >Titre</label>
                        <input type="text" id="titre" name="titre" value={formData.titre} onChange={onFormDataChange} required minLength='1' maxLength='150'></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description" >Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={onFormDataChange} required minLength='1' maxLength='500'></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="annee" >Année</label>
                        <input type="text" id="annee" name="annee" value={formData.annee} onChange={onFormDataChange}></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="realisation" >Realisation</label>
                        <input type="text" id="realisation" name="realisation" value={formData.realisation} onChange={onFormDataChange}></input>
                    </div>
                    <input type='submit' value="Envoyer" disabled={formValidity==="invalid"? "disabled":""}></input>
                </form>
                {
                    msgErreur !== "" ? (<div className="message-erreur">{msgErreur}</div>) : ""
                }
                
            </div>
        </main>
    )
}

export default FormFilm;