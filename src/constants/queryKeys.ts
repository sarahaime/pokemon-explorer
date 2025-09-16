/**
 * React Query key constants for consistent cache management
 * 
 * These query keys provide:
 * - Type safety with TypeScript
 * - Consistent naming across the app
 * - Easy cache invalidation
 * - Single source of truth for all query keys
 */

export const QUERY_KEYS = {
  // Pokemon list queries
  POKEMON_LIST: ['pokemon-list'] as const,
  
  // Individual Pokemon queries
  POKEMON: (name: string) => ['pokemon', name] as const,
  
  // Query key factories for related queries
  POKEMON_SPECIES: (name: string) => ['pokemon-species', name] as const,
  POKEMON_EVOLUTION: (name: string) => ['pokemon-evolution', name] as const,
} as const;

/**
 * Type definitions for query keys
 */
export type QueryKeys = typeof QUERY_KEYS;

/**
 * Helper function to get all pokemon-related query keys for cache invalidation
 */
export const getPokemonQueryKeys = () => ({
  all: ['pokemon'] as const,
  lists: () => [...getPokemonQueryKeys().all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...getPokemonQueryKeys().lists(), filters] as const,
  details: () => [...getPokemonQueryKeys().all, 'detail'] as const,
  detail: (name: string) => [...getPokemonQueryKeys().details(), name] as const,
});

/**
 * Export individual query key functions for convenience
 */
export const queryKeys = {
  pokemonList: QUERY_KEYS.POKEMON_LIST,
  pokemon: QUERY_KEYS.POKEMON,
  pokemonSpecies: QUERY_KEYS.POKEMON_SPECIES,
  pokemonEvolution: QUERY_KEYS.POKEMON_EVOLUTION,
} as const;
