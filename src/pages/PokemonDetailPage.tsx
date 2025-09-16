import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PokemonDetail } from "../components/PokemonDetail";
import { pokemonApiService } from "../services/pokemonApiService";

export const PokemonDetailPage = () => {
    const { name } = useParams();

    const { data: pokemon } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => pokemonApiService.getPokemonByName(name ?? ''),
    });

    return (
        <div className="h-full overflow-y-auto w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl text-center font-bold text-gray-900 mb-4">Pokemon Detail</h1>
                {pokemon && (
                    <PokemonDetail pokemon={pokemon} />
                )}
            </div>
        </div>
    );
};