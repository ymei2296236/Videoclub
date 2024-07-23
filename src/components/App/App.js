import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {jwtDecode} from 'jwt-decode';
import Accueil from '../Accueil/Accueil';
import Admin from '../Admin/Admin';
import Entete from '../Entete/Entete';
import Film from '../Film/Film';
import ListeFilms from '../ListeFilms/ListeFilms';
import NotFound from '../NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ModificationFilm from "../ModificationFilm/ModificationFilm";
import './App.css';

export const AppContext =  React.createContext();

function App() 
{
  const location = useLocation();

  // récupère l'état de logging depuis Local storage au chargement de la page
  let loggingLocal = { };
  
  if(localStorage.logging) loggingLocal = JSON.parse(localStorage.logging);
  
  const [logging, setLogging] = useState(loggingLocal);
  
  useEffect(() => 
  {
    if(localStorage.getItem('logging'))
    {
      // on vérifie à chaque changement dans la page si notre jeton est valide
      try{
        const token = localStorage.getItem("logging");
        const decode = jwtDecode(token);
  
        // on vérifie si le jeton est expiré
        if(Date.now() > decode.exp * 1000 ) // Date.now est un milisecond, decode.exp en second
        {
          logout();
        }
      }
      catch(erreur)
      {
        console.log(erreur);
      }
    }
  }, [])
  
  
  let aLogging = {};

  /**
   * Enregistre l'info de logging au Local Storage lorsque l'utilisateur se connecte
   * @param {HTMLElement} e 
   */
  async function login(e)
  {
    e.preventDefault();

    const form = e.target;

    const body = 
    {
      courriel: form.courriel.value,
      mdp: form.mdp.value
    };

    const data = 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }

    const reponse = await fetch('http://localhost:3301/utilisateurs/connexion', data);

    const infoUsager = await reponse.json(); 

    if(reponse.status === 200)
    {
      aLogging = infoUsager;
      localStorage.setItem("logging", JSON.stringify(aLogging));
      setLogging(aLogging);
    }
  }


  /**
   * Gestion de logout
   */
  function logout()
  {
    let aLogging = {};

    localStorage.removeItem('logging');
    setLogging(aLogging);
  }

  
  return (
    // Tous les components dans AppContext auront accèss au logging
    <AppContext.Provider value={logging}>

      <Entete handleLogin={login} handleLogout={logout}/>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>

          <Route element={<PrivateRoute/>} >
            <Route path="/admin" element={<Admin/>} />
            <Route path="/admin/modification-film/:id" element={ <ModificationFilm/> }/>
          </Route>

          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms/>} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

    </AppContext.Provider>
  );
}

export default App;
