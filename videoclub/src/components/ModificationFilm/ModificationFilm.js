import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import  {useNavigate } from "react-router-dom";
import './ModificationFilm.css';


function ModificationFilm()
{
    //Recuperer l'id du film
    const {id} = useParams();
    const urlFilm = `http://localhost:3301/films/${id}`;
    
    // Declarer l'etat initial de film
    const [film, setFilm] = useState({});
    // const [dataInitial, setDataInitial] = useState({});
    let [genresFilm, setGenresFilm] = useState([]); 
    /**
     * Afficher les infos du film par son id au chargement de la page
     */
    useEffect(()=>
    {
        fetch(urlFilm)
        .then((response) => response.json())
        .then((data) =>
        {
            // console.log(data);
            setFilm(data);
            setGenresFilm(data.genres)
            // setDataInitial(data);
        })
        
    }, [urlFilm]);

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
        "Romance",
    ];

    const [formData, setFormData] = useState({});

    const [msgErreur, setMsgErreur] = useState();
    const [msgSuc, setMsgSuc] = useState();
    const [styleErreur, setStyleErreur] = useState([]);
    const champErr = [];
    
    const navigate = useNavigate();

    /**
     * Détecter la saisie de données 
     * @param {Event} e 
     */
    function onFormDataChange(e)
    {
        try 
        {        
            const {name,value} = e.target;

            if(name.startsWith("genre"))
            {   
                const estCoche = e.target.checked;
                
                // si on décoche et que la valeur est dans le tableau de notre objet film, on l'enlève 
                if(!estCoche && genresFilm.includes(value))
                {
                    let index = genresFilm.indexOf(value);
                    genresFilm.splice(index,1);
                }
                // si on coche la boite et qu'elle n'est pas dans le tableau de l'objet film, on l'ajoute
                else if (estCoche && !genresFilm.includes(value))
                {
                    genresFilm.push(value);
                }

                const donneeModifiees ={...formData, genres:genresFilm }; // la clé de dataInitial "genres" et le tableau de donnée "genres" ont le même nom, donc "genres:genres" peut être raccourci à "genres"

                setFormData(donneeModifiees);
            }
            else if (name==="titreVignette")
            {
                const nomfichier = e.target.files[0].name;
                const donneeModifiees ={...formData,titreVignette:nomfichier };
                // Met à jour la donnée
                setFormData(donneeModifiees);
            }   
            else 
            {          
                // On clone la donnée dans un nouvel objet
                const donneeModifiees ={...formData,[name]:value };
                // Met à jour la donnée
                setFormData(donneeModifiees);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }

    async function onFormSubmit(e)
    {
        e.preventDefault();

        // Si'l n'y a pas de changment au formulaire
        if(Object.keys(formData).length === 0)
        {
            navigate("/Admin");
        }

        // Récupèrer le token de l'utilisateur connecté
        const token = JSON.parse(localStorage.getItem("logging")).admin;

        // Prépare le donnée
        const data = {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "authorization": `Bearer ${token}`,
            },
            body:JSON.stringify(formData),
        }

        // On soumet
        const requete = await fetch(urlFilm, data);
        
        // On gère la réponse du formulaire
        const reponse = await requete.json();

        if(requete.status === 200)
        {
            // Enlever le message et le style d'erreur si'l y en a
            setStyleErreur([]);
            setMsgErreur();
            
            // Afficher un message de succès 
            setMsgSuc(reponse.message);

            // rédiriger la page
            setTimeout(() => navigate("/Admin"), 2500);
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
        <main className="wrapper">
            <div className="container-form">
                <h1 className='mb-lg'>Gestion des films</h1>
                
                <form className='form-film pt-lg pb-lg pl-lg pr-lg' onSubmit={onFormSubmit}>
                    <h2>Modifier le film</h2>

                    <div className="form__inputs">
                        <div className={`input-group ${styleErreur.titre ? 'label-erreur' : '' }`}>
                            <label htmlFor="titre" >Titre</label>
                            <input type="text" id="titre" name="titre" value={formData.titre? formData.titre : film.titre} onChange={onFormDataChange}  minLength='1' maxLength='150'></input>
                        </div>
                        <div className={`input-group ${styleErreur.annee ? 'label-erreur' : '' }`}>
                            <label htmlFor="annee" >Année</label>
                            <input type="text" id="annee" name="annee" value={formData.annee? formData.annee : film.annee} onChange={onFormDataChange} required/>
                        </div>
                        <div className={`input-group ${styleErreur.realisation ? 'label-erreur' : '' }`}>
                            <label htmlFor="realisation" >Realisation</label>
                            <input type="text" id="realisation" name="realisation" value={formData.realisation? formData.realisation : film.realisation} onChange={onFormDataChange} required></input>
                        </div>
                        <div className={`input-group ${styleErreur.description ? 'label-erreur' : '' }`}>
                            <label htmlFor="description"required >Description</label>
                            <textarea id="description" name="description" value={formData.description? formData.description : film.description} onChange={onFormDataChange} required minLength='1' maxLength='500'></textarea>
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
                                            checked={genresFilm.includes(element)}
                                        />
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>

                    <div className={`input-group container-Vignette ${styleErreur.titreVignette ? 'label-erreur' : '' }`}>
                        <label className="label" htmlFor="titreVignette">Vignette </label>
                        <img src={`/img/${film.titreVignette}`} alt={film.titre}/>
                        <div className="inputVignette">
                            <span className="notes">Pour remplacer cette image</span>
                            <input type="file" name="titreVignette" id="titreVignette" accept=".jpg,.jpeg,.png,.webp" onChange={onFormDataChange}/>
                        </div>
                    </div>
                    <input type='submit' className='btn btn-dark' value="Envoyer" ></input>
                </form>

                { msgErreur !== "" ? (<div className="box-erreur">{msgErreur}</div>) : "" }
                { msgSuc !== "" ? (<div className="box-success">{msgSuc}</div>) : "" }
            </div>
        </main>
    )
}

export default ModificationFilm;