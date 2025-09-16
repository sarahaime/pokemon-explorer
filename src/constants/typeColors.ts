export type PokemonTypeName =
    | 'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy';

export interface TypeColor {
    mainColor: string;
    lightColor: string;
}

export const TYPE_COLORS: Record<PokemonTypeName, TypeColor> = {
    normal: { mainColor: '#AAA67F', lightColor: 'rgba(170, 166, 127, 0.2)' },
    fire: { mainColor: '#F57D31', lightColor: 'rgba(245, 125, 49, 0.2)' },
    water: { mainColor: '#6493EB', lightColor: 'rgba(100, 147, 235, 0.2)' },
    electric: { mainColor: '#F9CF30', lightColor: 'rgba(249, 207, 48, 0.2)' },
    grass: { mainColor: '#74CB48', lightColor: 'rgba(116, 203, 72, 0.2)' },
    ice: { mainColor: '#9AD6DF', lightColor: 'rgba(154, 214, 223, 0.2)' },
    fighting: { mainColor: '#C12239', lightColor: 'rgba(193, 34, 57, 0.2)' },
    poison: { mainColor: '#A43E9E', lightColor: 'rgba(164, 62, 158, 0.2)' },
    ground: { mainColor: '#DEC16B', lightColor: 'rgba(222, 193, 107, 0.2)' },
    flying: { mainColor: '#A891EC', lightColor: 'rgba(168, 145, 236, 0.2)' },
    psychic: { mainColor: '#F85584', lightColor: 'rgba(248, 85, 132, 0.2)' },
    bug: { mainColor: '#A7B723', lightColor: 'rgba(167, 183, 35, 0.2)' },
    rock: { mainColor: '#B69E31', lightColor: 'rgba(182, 158, 49, 0.2)' },
    ghost: { mainColor: '#70559B', lightColor: 'rgba(112, 85, 155, 0.2)' },
    dragon: { mainColor: '#7037FF', lightColor: 'rgba(112, 55, 255, 0.2)' },
    dark: { mainColor: '#75574C', lightColor: 'rgba(117, 87, 76, 0.2)' },
    steel: { mainColor: '#B7B9D0', lightColor: 'rgba(183, 185, 208, 0.2)' },
    fairy: { mainColor: '#E69EAC', lightColor: 'rgba(230, 158, 172, 0.2)' },
};

export const NEUTRAL_BG = '#F3F4F6';

