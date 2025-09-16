import { useQuery } from '@tanstack/react-query';
import { pokemonApiService } from '../services/pokemonApiService';
import { useFavorites } from '../hooks/useFavorites';
import { PokemonLoadingCard } from './PokemonLoadingCard';
import { HeartIcon } from './icons';

interface PokemonCardProps {
  pokemonName: string;
  onClick: () => void;
}

export const PokemonCard = ({ pokemonName, onClick }: PokemonCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => pokemonApiService.getPokemonByName(pokemonName),
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(pokemonName);
    
  };

  if (isLoading) {
    return (<PokemonLoadingCard />);
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-sm text-gray-500">#{pokemon.id}</span>
        <button
          onClick={handleFavoriteClick}
          className="cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out"
        >
          <HeartIcon
            width={24}
            height={24}
            stroke={isFavorite(pokemon.name) ? '#dc2626' : '#9ca3af'}
            filled={isFavorite(pokemon.name)}
          />
        </button>
      </div>
      
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="w-full h-32 object-contain mb-1"
      />
      
      <h3 className="font-bold text-lg capitalize">{pokemon.name}</h3>
      
      <div className="flex gap-1 mt-2">
        {pokemon.types.map((type, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-200 rounded text-xs capitalize"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};