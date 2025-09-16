import { useState } from 'react';
import { Pokemon } from '../types/pokemon';
import { PokeballBackgroundIcon } from './icons';
import { getTypeStyle, getTypeStyleByPokemon } from '../utils/getTypeStyle';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  const typeStyle = getTypeStyleByPokemon(pokemon);
  const [showAllMoves, setShowAllMoves] = useState(false);

  const getStatName = (statName: string) => {
    const statMap: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'ATK',
      'defense': 'DEF',
      'special-attack': 'SATK',
      'special-defense': 'SDEF',
      'speed': 'SPD'
    };
    return statMap[statName] || statName;
  };


  return (
    <div
      className="min-h-screen w-full"
    >
      <div className="px-6 py-8 flex justify-center relative">
        <span className={`text-lg text-white opacity-80 absolute top-0 right-0`}>
          #{pokemon?.id}
        </span>
        <div className="absolute inset-0 flex items-start justify-end z-0">
          <PokeballBackgroundIcon width={300} height={300} />
        </div>

        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-64 h-64 object-contain relative z-10"
        />
      </div>


      <div className="bg-gray-50 rounded-3xl min-h-96 px-6 py-6">

        <div className="flex gap-2 justify-center mb-6">
          {pokemon.types.map((type, index) => {
            const typeStyle = getTypeStyle(type.type.name as any);
            return (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-sm capitalize font-medium text-white`}
                style={{ backgroundColor: typeStyle.backgroundColor }}
              >
                {type.type.name}
              </span>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: typeStyle.backgroundColor }}>
            Base Stats
          </h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat, index) => {
              const maxStat = 255;
              const percentage = (stat.base_stat / maxStat) * 100;

              return (
                <div key={index} className="flex items-center gap-4">
                  <span
                    className="text-sm font-bold w-12 text-right"
                    style={{ color: typeStyle.backgroundColor }}
                  >
                    {getStatName(stat.stat.name)}
                  </span>
                  <div
                    className="flex-1 rounded-full h-2 relative overflow-hidden"
                    style={{ backgroundColor: typeStyle.backgroundColorLight }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        backgroundColor: typeStyle.backgroundColor,
                        width: `${Math.min(percentage, 100)}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">
                    {stat.base_stat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4" style={{ color: typeStyle.backgroundColor }}>
            Moves
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {(showAllMoves ? pokemon.moves : pokemon.moves.slice(0, 20)).map((move, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm capitalize"
              >
                {move.move.name.replace('-', ' ')}
              </span>
            ))}
          </div>


          {pokemon.moves.length > 20 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAllMoves(!showAllMoves)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-900 cursor-pointer"
                style={{
                  backgroundColor: typeStyle.backgroundColorLight,
                }}
              >
                {showAllMoves ? '- Show Less' : `+ View All ${pokemon.moves.length} Moves`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};