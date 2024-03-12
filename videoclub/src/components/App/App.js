import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Accueil from '../Accueil/Accueil';
import Admin from '../Admin/Admin';
import Entete from '../Entete/Entete';
import Film from '../Film/Film';
import ListeFilms from '../ListeFilms/ListeFilms';
import NotFound from '../NotFound/NotFound';
import './App.css';

export const AppContext =  React.createContext();

function App() 
{
  const location = useLocation();

  // récupère l'état de logging depuis Local storage au chargement de la page
  let loggingLocal = { usager:'' };

  if(localStorage.logging) loggingLocal = JSON.parse(localStorage.logging);
  
  const [logging, setLogging] = useState(loggingLocal);

  /**
   * Enregistre l'info de logging au Local Storage lorsque l'utilisateur se connecte
   * @param {HTMLElement} e 
   */
  function login(e)
  {
    e.preventDefault();

    // Enregistre l'info de logging
    let aLogging = {};

    if(e.target.usager.value === 'admin') 
    { 
      aLogging['usager'] = e.target.usager.value;
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

    localStorage.clear();
    setLogging(aLogging);
  }

  
  return (
    // Tous les components dans AppContext auront accèss au logging
    <AppContext.Provider value={logging}>

      <Entete handleLogin={login} handleLogout={logout}/>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms/>} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/admin" element={logging? <Admin/> : <Navigate to="/"/>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

    </AppContext.Provider>
  );
}

export default App;
