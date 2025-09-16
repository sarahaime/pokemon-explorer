export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    types: Array<{
      type: {
        name: string;
      };
    }>;
    moves: Array<{
      move: {
        name: string;
      };
    }>;
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      };
    }>;
  }
  
  export interface PokemonListItem {
    name: string;
    url: string;
  }
  
  export interface PokemonListResponse {
    results: PokemonListItem[];
    next: string | null;
    previous: string | null;
    count: number;
  }