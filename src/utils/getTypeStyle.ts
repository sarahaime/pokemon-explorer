import { TYPE_COLORS, NEUTRAL_CARD_BG, PokemonTypeName } from '../constants/typeColors';
import { Pokemon } from '../types/pokemon';

export interface ComputedChipStyle {
  backgroundColor: string;
  textColorClass: string;
}

const LIGHT_TEXT_TYPES: PokemonTypeName[] = [
  'fighting',
  'poison',
  'ghost',
  'dragon',
  'dark',
];

export function getPrimaryTypeName(pokemon: Pokemon | undefined): PokemonTypeName | undefined {
  const name = pokemon?.types?.[0]?.type?.name as PokemonTypeName | undefined;
  return name;
}

export function getTypeStyleByPokemon(pokemon: Pokemon | undefined): ComputedChipStyle {
  const primary = getPrimaryTypeName(pokemon);
  if (!primary || !(primary in TYPE_COLORS)) {
    return {
      backgroundColor: NEUTRAL_CARD_BG,
      textColorClass: 'text-gray-900',
    };
  }

  const { bg } = TYPE_COLORS[primary];
  const useLightText = LIGHT_TEXT_TYPES.includes(primary);

  return {
    backgroundColor: bg,
    textColorClass: useLightText ? 'text-white' : 'text-gray-900'
  };
}


export function getTypeStyle(pokemonTypeName: PokemonTypeName): ComputedChipStyle {
    if (!pokemonTypeName || !(pokemonTypeName in TYPE_COLORS)) {
      return {
        backgroundColor: NEUTRAL_CARD_BG,
        textColorClass: 'text-gray-900',
      };
    }
  
    const { bg } = TYPE_COLORS[pokemonTypeName];
    const useLightText = LIGHT_TEXT_TYPES.includes(pokemonTypeName);
  
    return {
      backgroundColor: bg,
      textColorClass: useLightText ? 'text-white' : 'text-gray-900'
    };
  }
  

