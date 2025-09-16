import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { PokemonDetail } from "../components/PokemonDetail";
import { PokemonDetailLoading } from "../components/PokemonDetailLoading";
import { PokemonDetailHeader } from "../components/PokemonDetailHeader";
import { pokemonApiService } from "../services/pokemonApiService";
import { getTypeStyleByPokemon } from "../utils/getTypeStyle";
import { useFavorites } from "../hooks/useFavorites";
import { QUERY_KEYS } from "../constants/queryKeys";
import { LOADING_STYLES } from "../constants/loadingStyles";

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

    const { data: pokemon, isLoading } = useQuery({
        queryKey: QUERY_KEYS.POKEMON(name ?? ''),
        queryFn: () => pokemonApiService.getPokemonByName(name ?? ''),
    });

    const typeStyle = getTypeStyleByPokemon(pokemon);

    if (isLoading) {
        return (
            <div className={`h-full overflow-y-auto w-full pt-2`} style={{ backgroundColor: LOADING_STYLES.defaultBg }}>
                <PokemonDetailHeader
                    pokemonName={name}
                    isLoading={true}
                    isFavorite={isFavorite(name ?? '')}
                    onBackClick={handleBackClick}
                    onFavoriteClick={handleFavoriteClick}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <PokemonDetailLoading />
                </div>
            </div>
        );
    }

    return (
        <div className={`h-full overflow-y-auto w-full pt-2`} style={{ backgroundColor: typeStyle.backgroundColor }}>
            <PokemonDetailHeader
                pokemonName={pokemon?.name}
                isLoading={false}
                isFavorite={isFavorite(name ?? '')}
                onBackClick={handleBackClick}
                onFavoriteClick={handleFavoriteClick}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {pokemon && (
                    <PokemonDetail pokemon={pokemon} />
                )}
            </div>
        </div>
    );
};