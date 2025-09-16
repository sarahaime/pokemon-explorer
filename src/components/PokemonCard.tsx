import { useQuery } from '@tanstack/react-query';
import { pokemonApiService } from '../services/pokemonApiService';
import { useFavorites } from '../hooks/useFavorites';
import { PokemonLoadingCard } from './PokemonLoadingCard';
import { HeartIcon } from './icons';
import { getTypeStyle } from '../utils/getTypeStyle';

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
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 p-6 cursor-pointer hover:shadow-lg hover:bg-white transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-gray-500">#{pokemon.id}</span>
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
          className="w-full h-36 object-contain"
        />
    
      <h3 className="font-bold text-xl capitalize text-gray-800 mb-3 z-20">{pokemon.name}</h3>
        
        <div className="flex gap-2">
          {pokemon.types.map((type, index) => {
            const typeStyle = getTypeStyle(type.type.name as any);
            return (
              <span 
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${typeStyle.textColorClass}`}
                style={{ backgroundColor: typeStyle.backgroundColor }}
              >
                {type.type.name}
              </span>
            );
          })}
        </div>

      <div className="bg-gray-100 rounded-2xl p-4 h-35 w-full absolute bottom-0 left-0 right-0 -z-10">
       
      </div>
    </div>
  );
};