import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppContext } from '../App/App';
import Film from './Film';

describe('Composant Film', () => 
{
    // Objet fictif
    const mockFilm = 
    {
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


    // Mock du contexte
    const mockContextValue = 
    {
        usager: 'admin'
    };


    // Wrapper pour fournir le contexte
    const ContextWrapper = ({ children }) => 
    (
        <AppContext.Provider value={mockContextValue}>
            {children}
        </AppContext.Provider>
    );

    // Mock des notes
    const notes = mockFilm.notes;

    const mockNotes = 
    {
        moyenne: (notes.reduce((a, b) => a+b, 0)/ notes.length).toFixed(2),
        nbVotes: notes.length
    }

    /**
     * Dans un test unitaire, il est généralement préférable de tester avec des valeurs fictives statiques plutôt qu'avec des valeurs réelles reçues du serveur.
     * Cela garantit que vos tests sont prévisibles, reproductibles et ne dépendent pas de l'état du serveur ou de l'environnement externe.
     */
    test('Vérifie le composant Film avec un objet data fictif', async () => 
    {
        /**
         * Intercepte l'appel fetch et le remplace par une fonction mockée qui simule et retourne une promesse résolue avec une valeur spécifique, ici l'objet fictif film.
         * Cela permet de tester le comportement du code lorsqu'il traite les réponses JSON de manière asynchrone, sans dépendre d'un serveur réel.
         */
        jest.spyOn(global, 'fetch').mockResolvedValue
        ({
            // L'instruction jest.fn() crée une fonction simulée qui peut être utilisée pour simuler le comportement de la méthode json(). 
            // Ensuite, mockResolvedValue(film) configure cette fonction simulée pour qu'elle retourne une promesse résolue avec la valeur film.
            json: jest.fn().mockResolvedValue(mockFilm),
        });


        /**
         * Crée une représentation virtuelle du composant <Film /> (ici contextualisé) dans l'environnement de test.
         * Cela simule le rendu du composant comme s'il était rendu dans un navigateur, mais dans un environnement contrôlé et isolé spécifiquement pour les tests.
         */
        render
        (
            <ContextWrapper>
                <Film />
            </ContextWrapper>
        );


        /**
         * L'instruction waitFor() attend que tous les tests dans sa fonction de rappel (callback) soit true avant de poursuivre les tests.
         * Si la fonction de rappel retourne false, waitFor() continuera d'attendre et réévaluera la fonction de rappel à intervalles réguliers jusqu'à ce que la condition soit remplie ou que le délai d'attente soit dépassé.
         * Ici, cela permet de valider que toutes les valeurs attendues dans le DOM du composant Film sont rendues correctement.
         */
        await waitFor(() => 
        {
            //expect(fetch).toHaveBeenCalledTimes(1);
            expect(screen.getByText(mockFilm.titre)).toBeInTheDocument();
            expect(screen.getByAltText(mockFilm.titre)).toBeInTheDocument();
            expect(screen.getByText(mockFilm.realisation)).toBeInTheDocument();
            expect(screen.getByText(`(${mockFilm.annee})`)).toBeInTheDocument();
            expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
            const elImg = document.querySelector('img');
            expect(elImg).toHaveAttribute('src', `/img/${mockFilm.titreVignette}`);
        });
      

        /**
         * Restaure la fonction fetch originale après avoir espionné et modifié son comportement pour les besoins d'un test.
         */
        global.fetch.mockRestore();
    });


    /**
     * Vérifier si la moyenne et le nombre de vote(s) affichées sont présents dans le document
     */
    test('Vérifie la moyenne et le nombre de vote(s)', async () => 
    {
        jest.spyOn(global, 'fetch').mockResolvedValue
        ({
            json: jest.fn().mockResolvedValue(mockFilm),
        });

        // sur mockFilm, faire la poutine pour trouver la moyenne et le nombre de vote(s)
        // render le composant Vote avec sa/ses props
        render
        (
            <ContextWrapper>
                <Film data={mockNotes}/>
            </ContextWrapper>
        );

        // sur screen toBe() pour moyenne puis nombre de votes
        await waitFor(() => 
        {
            expect(screen.getByTestId('moyenne').textContent).toBe(`${mockNotes.moyenne}/5,`);
            expect(screen.getByTestId('nbVotes').textContent).toBe(` ${mockNotes.nbVotes} votes`);
        });

        global.fetch.mockRestore();
    });

    
    /**
     * Il est également important de tester avec des données réelles provenant du serveur pour s'assurer que l'application fonctionne correctement dans un environnement plus réaliste. 
     */
    test('Vérifie si les clés sont présentes dans la réponse', async () => 
    {
        const reponse = await fetch( 'https://cadriel-front.onrender.com/films/2BdBApXAxxmfDK9GmdRE');

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