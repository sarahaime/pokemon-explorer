import { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApiService = {
  async getPokemons(offset: number = 0, limit: number = 20): Promise<PokemonListResponse> {
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.json();
  },

  async getPokemonById(id: number): Promise<Pokemon> {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    return response.json();
  },

  async getPokemonByName(name: string): Promise<Pokemon> {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`);
    return response.json();
  }
};