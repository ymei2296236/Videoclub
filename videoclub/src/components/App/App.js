import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import ListeFilms from '../ListeFilms/ListeFilms';
import Entete from '../Entete/Entete';
import Film from '../Film/Film';
import NotFound from '../NotFound/NotFound';
import React, { useState } from 'react';
import Admin from '../Admin/Admin';
import './App.css';

import useScreenSize from '../useScreenSize';

export const AppContext =  React.createContext();

function App() 
{
  const screenSize = useScreenSize();
  const widthScreen = screenSize.width;

  // console.log(widthScreen);
  const [logging, setLogging] = useState(JSON.parse(localStorage.logging));
  // const [logging, setLogging] = useState({ estLog:false, usager:'' });

  function login(e)
  {
    e.preventDefault();

    let aLogging = {};

    if(e.target.usager.value === 'admin') 
    {
      // estLog(prevEstLog => !prevEstLog);
      // setLogging({estLog:true, usager: e.target.usager.value});
      // setLogging(logging => ({...logging, estLog: true, usager: e.target.usager.value}));
    
      aLogging['estLog'] = e.target.usager.value;
      localStorage.setItem("logging", JSON.stringify(aLogging));
      
      e.target.reset(); // si c'est la bonne valeur, réinitialiser le champs
      setLogging(localStorage.logging);

    }
  }

  
  return (
    // Tous les components dans AppContext auront accèss au logging
    // <AppContext.Provider value={logging}>
    <AppContext.Provider value={logging}>
      <Router>
      {/* <Entete handleLogin={login} estLog={estLog}/> */}
      <Entete handleLogin={login}/>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms widthScreen={widthScreen}/>} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/admin" element={logging? <Admin/> : <Navigate to="/"/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
