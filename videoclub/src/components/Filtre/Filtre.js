import './Filtre.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TuileFilm from '../TuileFilm/TuileFilm';


function Filtre(props) 
{
    const urlListeFilms = 'data/titre-asc.json';

    const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);


    /**
     * Récupère la valeur du filtre cliqué
     * @param {HTMLElement} e 
     */    
    function filtre(e)
    {
        let filtre = e.target.dataset.jsFiltre;

        switch(filtre)
        {
            case 'titre-asc' : 
                props.handleUrl('data/titre-asc.json');
                break;
            case 'titre-desc' : 
                props.handleUrl('data/titre-desc.json');
                break;
            case 'realisation-asc' : 
                props.handleUrl('data/realisation-asc.json');
                break;
            case 'realisation-desc' : 
                props.handleUrl('data/realisation-desc.json');
                break;
            case 'annee-asc' : 
                props.handleUrl('data/annee-asc.json');
                break;
            case 'annee-desc' : 
                props.handleUrl('data/annee-desc.json');
                break;
        }
    }

    /**
     * Gère le style du filtre actif
     * @param {HTMLElement} e 
     */
    function gereActive(e)
    {
        let filtre = e.target.dataset.jsFiltre,
            urlsActive = document.querySelectorAll('[data-js-filtre]');

        for (let i = 0, l = urlsActive.length; i < l; i++) 
        {
            if(urlsActive[i].dataset.jsFiltre != filtre) urlsActive[i].classList.remove('active');
        }

        e.target.classList.add('active');
    }


    return (
        <ul>
            <li data-js-filtre="titre-asc" onClick={(e)=>{filtre(e); gereActive(e)}}>Titre alphabétique(A-Z)</li>
            <li data-js-filtre="titre-desc" onClick={(e)=>{filtre(e); gereActive(e)}}>Titre alphabétique(Z-A)</li>
            <li data-js-filtre="realisation-asc" onClick={(e)=>{filtre(e); gereActive(e)}}>Réalisateur alphabétique(A-Z)</li>
            <li data-js-filtre="realisation-desc"  onClick={(e)=>{filtre(e); gereActive(e)}}>Réalisateur alphabétique(Z-A)</li>
            <li data-js-filtre="annee-asc"  onClick={(e)=>{filtre(e); gereActive(e)}}>Années de production(Asc)</li>
            <li data-js-filtre="annee-desc"  onClick={(e)=>{filtre(e); gereActive(e)}}>Années de production(Desc)</li>
        </ul>
    );
}

export default Filtre;