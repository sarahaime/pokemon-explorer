import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { PokemonDetail } from "../components/PokemonDetail";
import { pokemonApiService } from "../services/pokemonApiService";
import { getTypeStyleByPokemon } from "../utils/getTypeStyle";
import { useFavorites } from "../hooks/useFavorites";
import { HeartIcon, BackIcon } from "../components/icons";

export const PokemonDetailPage = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleFavoriteClick = () => {
        toggleFavorite(name ?? '');
    };

    const handleBackClick = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const { data: pokemon } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => pokemonApiService.getPokemonByName(name ?? ''),
    });

    const typeStyle = getTypeStyleByPokemon(pokemon);



    return (
        <div className={`h-full overflow-y-auto w-full pt-2`} style={{ backgroundColor: typeStyle.backgroundColor }}>
            <div className="px-6 py-2 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleBackClick}
                        className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                    >
                        <BackIcon />
                    </button>
                    <div>
                        <h1 className={`text-3xl font-bold capitalize text-white`}>
                            {pokemon?.name}
                        </h1>
                    </div>
                </div>
                <button
                    onClick={handleFavoriteClick}
                    className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                >
                    <HeartIcon
                        width={32}
                        height={32}
                        fillColor={isFavorite(name ?? '') ? '#ef4444' : '#9ca3af'}
                        filled={isFavorite(name ?? '')}
                    />
                </button>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {pokemon && (
                    <PokemonDetail pokemon={pokemon} />
                )}
            </div>
        </div>
    );
};