import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormFilm from '../FormFilm/FormFilm';
import './Admin.css';

function Admin() 
{

  const [listeFilms, setListeFilms] = useState([]); // useState fait un rendu dès que l'état changé 
  const urlListeFilms = 'http://localhost:3301/films?tri=titre';

  /**
   * Fait un appel à la base de données suite au changement de listFilms
   */ 
  useEffect(()=>
  {
    fetch(urlListeFilms)
      .then((response) => response.json())
      .then((data) => 
      {
      // console.log(data);
        setListeFilms(data);
      })
  }, [urlListeFilms.length]); 
  

  async function supprimerFilm(e)
  {
    e.preventDefault();
    const idFilm = e.target.firstElementChild.value;
    // Récupèrer le token de l'utilisateur connecté
    const token = JSON.parse(localStorage.getItem("logging")).admin;

    const oOptions = 
    {
      method: "DELETE",
      headers: {
          "Content-Type":"application/json",
          "authorization": `Bearer ${token}`,
      },
    }

    // PUT pour modifier le film 
    const deleteFilm = await fetch(`http://localhost:3301/films/${idFilm}`, oOptions),
    // GET pour reaffichier le film 
      getListeFilms = await fetch(urlListeFilms);

    Promise.all([deleteFilm, getListeFilms])
      .then(respone => respone[1].json())
      .then((data) => setListeFilms(data))  
  }


 
  /**
   * Création des tuilesFilm
   */
  const itemsFilm = listeFilms.map((film, index)=>
  {
    return  <div key={index} className='item-film'>
              <Link data={film} to={`/film/${film.id}`} >
                <span> {film.titre} </span>
              </Link>
              <Link data={film} to={`/admin/modification-film/${film.id}`} >
                <button className='btn btn-sm'>Modifier</button>
              </Link>
            <form onSubmit={supprimerFilm}>
              <input type='hidden' value={film.id}></input>
              <button className='btn btn-sm'>Supprimer</button>
            </form>
          </div>

  })


  return (
    <main className='wrapper'>
        <div className='admin'>
            <h1 className='mb-lg'>Gestion des films</h1>
              <FormFilm urlListeFilms={urlListeFilms} setListeFilms={setListeFilms}/>
              <div className='container-itemsFilm'>
                {itemsFilm}
              </div>
        </div>
    </main>
  );
}

export default Admin;