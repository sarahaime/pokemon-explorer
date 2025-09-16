import { Pokemon } from '../types/pokemon';
import { useFavorites } from '../hooks/useFavorites';
import { HeartIcon } from './icons';
import { getTypeStyle } from '../utils/getTypeStyle';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    toggleFavorite(pokemon.name);
  };

  const getStatName = (statName: string) => {
    const statMap: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Special Attack',
      'special-defense': 'Special Defense',
      'speed': 'Speed'
    };
    return statMap[statName] || statName;
  };

  return (
      <div className="bg-white rounded-lg max-w-2xl w-full mx-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
            <div className="flex gap-2">
              <button
                onClick={handleFavoriteClick}
                className="hover:scale-110 transition-transform duration-200"
              >
                <HeartIcon
                  width={32}
                  height={32}
                  stroke={isFavorite(pokemon.name) ? '#ef4444' : '#d1d5db'}
                  filled={isFavorite(pokemon.name)}
                />
              </button>
             
            </div>
          </div>

          <div className="text-lg text-gray-600 mb-4">#{pokemon.id}</div>

          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-64 h-64 mx-auto mb-6"
          />

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Types</h3>
            <div className="flex gap-2">
              {pokemon.types.map((type, index) => {
                const typeStyle = getTypeStyle(type.type.name as any);
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm capitalize font-medium ${typeStyle.textColorClass}`}
                    style={{ backgroundColor: typeStyle.backgroundColor }}
                  >
                    {type.type.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{getStatName(stat.stat.name)}:</span>
                  <span>{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Moves</h3>
            <div className="max-h-32 overflow-y-auto">
              <div className="flex flex-wrap gap-1">
                {pokemon.moves.slice(0, 20).map((move, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                  >
                    {move.move.name.replace('-', ' ')}
                  </span>
                ))}
                {pokemon.moves.length > 20 && (
                  <span className="text-gray-500 text-sm">
                    +{pokemon.moves.length - 20} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};