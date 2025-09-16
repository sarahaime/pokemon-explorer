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
        const newFavorites = [...getFavorites(), pokemonName];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    const removeFavorite = (pokemonName: string) => {
        const newFavorites = getFavorites().filter((name: string) => name !== pokemonName);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };


    const getFavorites = () => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    };

    return {    
        favorites,
        toggleFavorite,
        isFavorite
    };
};