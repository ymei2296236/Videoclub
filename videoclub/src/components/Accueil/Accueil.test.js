import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accueil from './Accueil';
import accueil from './Accueil.json';


describe('Composant Accueil', () => 
{

    /**
     * Vérifier si chaque paragraphe du contenu de l'accueil est présent dans le document
     */
    test('Vérifie la présence de chaque paragraphe à l\'accueil', async () => 
    {
        render(<Accueil data={accueil} />);

        // Boucle l'objet json Accueil pour tester si chaque paragraphe est presente
        await accueil.forEach((paragrahpe) => 
        {    
            expect(screen.getByText(paragrahpe)).toBeInTheDocument();
        });
    });
});