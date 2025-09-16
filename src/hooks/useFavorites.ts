import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'pokemon-favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    
    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);


    const toggleFavorite = (pokemonName: string) => {
        if (isFavorite(pokemonName)) {
            removeFavorite(pokemonName);
        } else {
            addFavorite(pokemonName);
        }
    };

    const addFavorite = (pokemonName: string) => {
        const currentFavorites = getFavorites();
        if (!currentFavorites.includes(pokemonName)) {
            const newFavorites = [...currentFavorites, pokemonName];
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        }
    };

    const removeFavorite = (pokemonName: string) => {
        const newFavorites = getFavorites().filter((name: string) => name !== pokemonName);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };


    const getFavorites = () => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (error) {
                console.warn('Invalid JSON in localStorage, resetting favorites');
                localStorage.removeItem(FAVORITES_KEY);
                return [];
            }
        }
        return [];
    };

    return {    
        favorites,
        toggleFavorite,
        isFavorite
    };
};