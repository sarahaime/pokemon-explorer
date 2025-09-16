import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApiService } from '../services/pokemonApiService';
import { PokemonCard } from './PokemonCard';
import { PokemonListItem } from '../types/pokemon';
import { PokemonCardLoading } from './PokemonCardLoading';
import { QUERY_KEYS } from '../constants/queryKeys';

interface PokemonListProps {
    onPokemonClick: (pokemon: PokemonListItem) => void;
}

export const PokemonList = ({ onPokemonClick }: PokemonListProps) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        } = useInfiniteQuery({
        queryKey: QUERY_KEYS.POKEMON_LIST,
        queryFn: ({ pageParam = 0 }) => pokemonApiService.getPokemons(pageParam, 20),
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                return parseInt(url.searchParams.get('offset') || '0');
            }
            return undefined;
        },
        initialPageParam: 0,
    });

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const allPokemonItems = useMemo(() => {
        return data?.pages.flatMap(page => page?.results || []) || [];
    }, [data?.pages]);

    if (isLoading) {
        return (
            <div className="h-full overflow-y-auto mx-auto md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    {[...Array(8)].map((_, index) => (
                        <PokemonCardLoading key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className="h-full overflow-y-auto mx-auto md:px-6 lg:px-8"
            onScroll={handleScroll}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {allPokemonItems.map((pokemonItem: PokemonListItem) => (
                    <PokemonCard
                        key={pokemonItem.name}
                        pokemonName={pokemonItem.name}
                        onClick={() => onPokemonClick(pokemonItem)}
                    />
                ))}
            </div>
            {isFetchingNextPage && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    <PokemonCardLoading /><PokemonCardLoading /><PokemonCardLoading />
                </div>
            )}
        </div>
    );
};