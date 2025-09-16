
import { PokemonCard } from "../components/PokemonCard";
import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
    const { favorites } = useFavorites();
    const navigate = useNavigate();

    const handlePokemonClick = (pokemonName: string) => {
        navigate(`/pokemon/${pokemonName}`);
    };

    return (
        <div className="h-full overflow-y-auto w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Favorite Pokémon</h1>
                    {!favorites.length && (
                        <p className="text-gray-600">Pokemon you have marked as favorites will appear here.</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                        {favorites.map((name: string) => (
                            <PokemonCard
                                key={name}
                                pokemonName={name}
                                onClick={() => handlePokemonClick(name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};