import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import Accueil from '../Accueil/Accueil';
import ListeFilms from '../ListeFilms/ListeFilms';
import Entete from '../Entete/Entete';
import Film from '../Film/Film';
import NotFound from '../NotFound/NotFound';
import Admin from '../Admin/Admin';
import './App.css';

import useScreenSize from '../useScreenSize';

export const AppContext =  React.createContext();

function App() 
{
  const location = useLocation();
  const screenSize = useScreenSize();
  const widthScreen = screenSize.width;

  // console.log(widthScreen);
  let loggingInitial;

  if(localStorage.logging) loggingInitial = JSON.parse(localStorage.logging);
  
  else loggingInitial = { usager:'' };
  
  const [logging, setLogging] = useState(loggingInitial);

  function login(e)
  {
    // e.preventDefault();

    let aLogging = {};

    if(e.target.usager.value === 'admin') 
    {
      // estLog(prevEstLog => !prevEstLog);
      // setLogging({estLog:true, usager: e.target.usager.value});
      // setLogging(logging => ({...logging, estLog: true, usager: e.target.usager.value}));
    
      aLogging['usager'] = e.target.usager.value;
      localStorage.setItem("logging", JSON.stringify(aLogging));
      
      e.target.reset(); // si c'est la bonne valeur, réinitialiser le champs
      setLogging(localStorage.logging);

    }
  }

  
  return (
    // Tous les components dans AppContext auront accèss au logging
    <AppContext.Provider value={logging}>
      {/* <Router> */}
      <Entete handleLogin={login}/>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms widthScreen={widthScreen}/>} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/admin" element={logging? <Admin/> : <Navigate to="/"/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      {/* </Router> */}
    </AppContext.Provider>
  );
}

export default App;
