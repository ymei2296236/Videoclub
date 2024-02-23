import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import ListeFilms from '../ListeFilms/ListeFilms';
import Entete from '../Entete/Entete';
import Film from '../Film/Film';
import NotFound from '../NotFound/NotFound';

import './App.css';

function App() {
  return (
    <Router>
      <Entete />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/liste-films" element={<ListeFilms />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;