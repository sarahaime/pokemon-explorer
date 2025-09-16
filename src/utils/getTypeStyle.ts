import { TYPE_COLORS, NEUTRAL_BG, PokemonTypeName } from '../constants/typeColors';
import { Pokemon } from '../types/pokemon';

export interface ComputedTypeStyle {
  backgroundColor: string;
  backgroundColorLight: string;
}

export function getPrimaryTypeName(pokemon: Pokemon | undefined): PokemonTypeName | undefined {
  const name = pokemon?.types?.[0]?.type?.name as PokemonTypeName | undefined;
  return name;
}

export function getTypeStyleByPokemon(pokemon: Pokemon | undefined): ComputedTypeStyle {
  const primary = getPrimaryTypeName(pokemon);
  if (!primary || !(primary in TYPE_COLORS)) {
    return {
      backgroundColor: NEUTRAL_BG,
      backgroundColorLight: 'rgba(243, 244, 246, 0.2)',
    };
  }

  const { mainColor: bg, lightColor: opacityColor } = TYPE_COLORS[primary];

  return {
    backgroundColor: bg,
    backgroundColorLight: opacityColor
  };
}

export function getTypeStyle(pokemonTypeName: PokemonTypeName): ComputedTypeStyle {
    if (!pokemonTypeName || !(pokemonTypeName in TYPE_COLORS)) {
      return {
        backgroundColor: NEUTRAL_BG,
        backgroundColorLight: 'rgba(243, 244, 246, 0.2)',
      };
    }
  
    const { mainColor: bg, lightColor: opacityColor } = TYPE_COLORS[pokemonTypeName];
  
    return {
      backgroundColor: bg,
      backgroundColorLight: opacityColor,
    };
  }
  

