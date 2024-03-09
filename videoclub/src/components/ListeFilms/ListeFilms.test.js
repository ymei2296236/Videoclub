import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListeFilms from './ListeFilms';
import TuileFilm from '../TuileFilm/TuileFilm';


describe('la description d\'un film', () => {

    // Objet fictif
    const mockFilm = {
        titre: 'Alien - Le 8ème passager',
        genres: ['Horreur', 'Science-fiction'],
        description: 'Un vaisseau spatial perçoit une transmission non-identifiée comme un signal de détresse...',
        titreVignette: 'alienle8emepassager.jpg',
        realisation: 'Ridley Scott',
        annee: 1979,
        notes: [3, 4, 5, 2, 1],
        commentaires: [
            { commentaire: 'Ccommentaire 1', auteur: 'admin' },
            { commentaire: 'Commentaire 2', auteur: 'admin' },
        ]
    };


    test('Vérifie la tuile d\'un film', () => {

        render(<TuileFilm data={mockFilm}/>);

        // screen est une representation de tuile
        expect(screen.getByText(mockFilm.titre)).toBeInTheDocument();

        const elImg = document.querySelector('img');
        expect(elImg).toHaveAttribute('src', `img/${mockFilm.titreVignette}`);

    });



    /**
     * Vérifier si les clés titre, genres, realisation, description, annee et titreVigneete sont présentes pour chaque film reçu de l'API
     */
    
    test('Vérifie si les clés sont présentes dans la réponse',  async () => 
    {
        // appel async pour recuperer l'id des films
        const reponse = await fetch( 'https://cadriel-front.onrender.com/films/');
        const data = await reponse.json();

        let aIdsFilm =[];

        await data.map((film) =>{ aIdsFilm.push(film.id) });

        // appel async pour recuperer les donnees de chaque film
        aIdsFilm.forEach((idFilm) => async function() 
        {
            const reponse = await fetch( `https://cadriel-front.onrender.com/films/${idFilm}`);
            const data = await reponse.json();
    
            await waitFor(() => 
            {
                expect(data).toHaveProperty('titre');
                expect(data).toHaveProperty('genres');
                expect(data).toHaveProperty('realisation');
                expect(data).toHaveProperty('description');
                expect(data).toHaveProperty('annee');
                expect(data).toHaveProperty('titreVignette');
            });
        });
    });
});