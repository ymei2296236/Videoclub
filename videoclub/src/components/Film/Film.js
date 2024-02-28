import './Film.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Film() 
{
  const {id} = useParams();
  // const urlFilm = `data/titre-asc.json/${id}`;
  const urlFilm = `https://cadriel-front.onrender.com/films/${id}`;
  const [film, setFilm] = useState({});
  const [vote, setVote] = useState();
  const [moyenne, setMoyenne] = useState();
  const [nbVotes, setnbVotes] = useState();

  const genres = film.genres?.map((genre, index)=>{
    return  <small key={index}>{genre} | </small>
  })

  useEffect(()=>
  {
    fetch(urlFilm)
      .then((response) => response.json())
      .then((data) => {
        setFilm(data);
        // console.log(data.notes);
        let noteTotale = data.notes;
        if (!noteTotale)        
        {
          setMoyenne('Aucun vote enregistré');
          setnbVotes(0);
        }
        else
        {
          // Référence : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
          let noteMoyenne = (noteTotale.reduce((a, b) => a+b, 0)/ noteTotale.length).toFixed(2),
            nbVotes = noteTotale.length;
          // console.log(noteMoyenne);
          setMoyenne(noteMoyenne);
          setnbVotes(nbVotes);
        }
      })
  }, [urlFilm]);

  async function soumettreNote()
  {
    let aNotes = [];

    if(!film.notes)
    {
      // aNotes = [vote];
      aNotes.push(parseInt(vote));
      // console.log(aNotes);
    }
    else
    {
      // console.log(film.notes);
      aNotes = film.notes;
      aNotes.push(parseInt(vote));
    }

    const oOptions = 
    {
      method: 'PUT',
      headers: 
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({notes: aNotes})
    }

    let putNote = await fetch(urlFilm, oOptions),
        getFilm = await fetch(urlFilm);

    Promise.all([putNote, getFilm])
      .then(respone => respone[1].json())
      .then((data) => {
        console.log(data);
        console.log(data.notes);
        setFilm(data);
        let noteTotale = data.notes;
        if (!noteTotale)        
        {
          setMoyenne('Aucun vote enregistré');
          setnbVotes(0);
        }
        else
        {
          let noteMoyenne = (noteTotale.reduce((a, b) => a+b, 0)/ noteTotale.length).toFixed(2),
            nbVotes = noteTotale.length;
          // console.log(noteMoyenne);
          setMoyenne(noteMoyenne);
          setnbVotes(nbVotes);
        }
      })

    // fetch(urlFilm, oOptions)
    //   .then((response) => response.json())
    //   .then((data) =>
    //   {
    //     console.log(data);
    //   })
  }

  function voter(e)
  {
    setVote(() => e.target.value);
  }

  return (

    <main className="film">
      <h2>Détails du film</h2>

      <div>
        <div className="film__img">
          <img src={`../img/${film.titreVignette}`} alt={film.titre}/>
        </div>
        <h2>{film.titre}</h2>
        <p>{film.realisation}</p>
        <p>{genres}</p>
        <p>{film.annee}</p>
        <p>Moyenne : {moyenne} </p>
        <p>Nombre de{ nbVotes === 1 ? 'vote' : 'votes' }  : {nbVotes} </p>


        <label><input type="radio" name="vote" value="1" onClick={voter} /> 1</label>
        <label><input type="radio" name="vote" value="2" onClick={voter} /> 2</label>
        <label><input type="radio" name="vote" value="3" onClick={voter} /> 3</label>
        <label><input type="radio" name="vote" value="4" onClick={voter} /> 4</label>
        <label><input type="radio" name="vote" value="5" onClick={voter} /> 5</label>

        <button onClick={soumettreNote}>Voter</button>
      </div>
  </main>


  );
}

export default Film;