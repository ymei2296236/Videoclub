import { useState } from "react";
import './FormFilm.css';

function FormFilm(props)
{
    const genres = [
        "Action",
        "Aventure",
        "Comédie",
        "Drame",
        "Fantaisie",
        "Horreur",
        "Policier",
        "Science-fiction",
        "Thriller",
        "Western",
    ];

    const dataInitial = {
        annee: "",
        description: "",
        genres: [],
        realisation: "",
        titre: "",
        titreVignette: "",
    };

    const [formData, setFormData] = useState(dataInitial);
    // const [formValidity, setFormValidity] = useState('invalid');

    const [msgSuc, setMsgSuc] = useState();
    const [msgErreur, setMsgErreur] = useState();
    const [styleErreur, setStyleErreur] = useState([]);
    const champErr = [];


    /**
     * Détecter la saisie des données 
     * @param {Event} e 
     */
    function onFormDataChange(e)
    {
        // réinitialse le message de succès si'l y en a
        setMsgSuc();

        try 
        {        
            const {name,value} = e.target;

            if(name.startsWith("genre"))
            {   
                const estCoche = e.target.checked;

                let genres = formData.genres || []; 

                // si on décoche et que la valeur est dans le tableau de notre objet film, on l'enlève 
                if(!estCoche && genres.includes(value))
                {
                    genres = genres.filter((genre, index)=>
                    {
                        return genre !== value;
                    })
                }
                // si on coche la boite et qu'elle n'est pas dans le tableau de l'objet film, on l'ajoute
                else if (estCoche && !genres.includes(value))
                {
                    genres.push(value);
                }
                const donneeModifiees ={...formData, genres }; // la clé de dataInitial "genres" et le tableau de donnée "genres" ont le même nom, donc "genres:genres" peut être raccourci à "genres"

                // Mettre à jour la variable 'formData' avec les données de formulaire
                setFormData(donneeModifiees);
            }
            else if (name==="titreVignette")
            {
                const nomfichier = e.target.files[0].name;
                const donneeModifiees ={...formData,titreVignette:nomfichier };
                // Mettre à jour la variable 'formData' avec les données de formulaire
                setFormData(donneeModifiees);
            }   
            else 
            {          
                // const estValide = e.target.form.checkValidity()? "valid": "invalid"
                // setFormValidity(estValide);
                
                // On clone la donnée dans un nouvel objet
                const donneeModifiees ={...formData,[name]:value };
                // Mettre à jour la variable 'formData' avec les données de formulaire
                setFormData(donneeModifiees);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }


    /**
     * Gérer l'envoi des données
     * @param {Event} e 
     */
    async function onFormSubmit(e)
    {
        e.preventDefault();

        setMsgSuc();

        /**
         * Vérifier si le formulaire est valide (pour ma culture personnelle)
         */
        // if(formValidity === 'invalid')
        // {
            //     // reportValidity() returns a boolean value indicating whether all of the inputs in the <form> were valid or not.
            //     e.target.reportValidity();
            // }

        // Récupèrer le token de l'utilisateur connecté
        const token = JSON.parse(localStorage.getItem("logging")).admin;

        const oOptions = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "authorization": `Bearer ${token}`,
            },
            body:JSON.stringify(formData),
        }

        // Requête POST pour créer le film 
        let postFilm = await fetch("http://localhost:3301/films", oOptions),
        // Requête GET récupérer la liste des films
            getListeFilms = await fetch(props.urlListeFilms);

        // On gère la réponse du formulaire
        const reponse = await postFilm.json();

        if(postFilm.status === 201)
        {
            // Enlever le message et le style d'erreur si'l y en a
            setStyleErreur([]);
            setMsgErreur();

            // Vider le formulaire
            setFormData(dataInitial);
            
            // Afficher un message de succès 
            setMsgSuc(reponse.message);

            // Réinit l'état de validité (pour ma culture personnelle)
            // setFormValidity('invalid');

            // Mettre à jour la liste des films
            Promise.all([postFilm, getListeFilms])
            .then(respone => respone[1].json())
            .then((data) => props.setListeFilms(data))  
        }
        else
        {
            // Récuperer les message prédifinis au serveur
            const erreurs = reponse.erreurs;

            // Identifier les champs d'erreur
            if(erreurs !== undefined)
            {
                // Gérer le style des champs invalids
                erreurs.forEach((erreur) => {champErr[erreur.path] = 'true';});
                setStyleErreur(champErr);
                
                // Afficher les message d'erreur 
                const msgErrs = erreurs.map((erreur, index)=>
                {
                    return <li key={index}> {erreur.msg} </li>
                })
                setMsgErreur(msgErrs);
            }
        }
    }


    return (
        <div className="container-form">


            <form className='form-film pt-lg pb-lg pl-lg pr-lg' onSubmit={onFormSubmit}>
                <h2>Ajouter un film</h2>

                <div className="form__inputs">
                    <div className={`input-group ${styleErreur.titre ? 'label-erreur' : '' }`}>
                        <label htmlFor="titre" >Titre</label>
                        <input type="text" id="titre" name="titre" value={formData.titre} onChange={onFormDataChange}  minLength='1' maxLength='150'></input>
                    </div>
                    <div className={`input-group ${styleErreur.annee ? 'label-erreur' : '' }`}>
                        <label htmlFor="annee" >Année</label>
                        <input type="text" id="annee" name="annee" value={formData.annee} onChange={onFormDataChange} ></input>
                    </div>
                    <div className={`input-group ${styleErreur.realisation ? 'label-erreur' : '' }`}>
                        <label htmlFor="realisation" >Realisation</label>
                        <input type="text" id="realisation" name="realisation" value={formData.realisation} onChange={onFormDataChange} ></input>
                    </div>
                    <div className={`input-group ${styleErreur.description ? 'label-erreur' : '' }`}>
                        <label htmlFor="description" >Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={onFormDataChange}  minLength='1' maxLength='500'></textarea>
                    </div>
                </div>

                <div>
                    <p className={`label ${styleErreur.genres ? 'label-erreur' : '' }`}>Genres</p>
                    <div className="checkbox-group mt-xs">
                    {
                        genres.map((element,index) => {
                            return (
                                <div key={index}> 
                                    <label htmlFor={element}>{element}</label>
                                    <input 
                                        type="checkbox" 
                                        id={element} 
                                        name={`genre-${element}`}
                                        value={element}
                                        onChange={onFormDataChange}
                                        checked={formData.genres.includes(element)}
                                    />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

                <div className={`input-group ${styleErreur.titreVignette ? 'label-erreur' : '' }`}>
                    <label className="label" htmlFor="titreVignette">Vignette </label>
                    <input type="file" name="titreVignette" id="titreVignette" accept=".jpg,.jpeg,.png,.webp" onChange={onFormDataChange}/>
                </div>

                <input type='submit' className='btn btn-dark' value="Envoyer" ></input>
                {/* <input type='submit' className='btn btn-dark' value="Envoyer" disabled={formValidity==="invalid"? "disabled":""}></input> */}
            </form>
            { msgErreur !== "" ? (<div className="box-erreur">{msgErreur}</div>) : "" }
            { msgSuc !== "" ? (<div className="box-success">{msgSuc}</div>) : "" }
        </div>
    )
}

export default FormFilm;