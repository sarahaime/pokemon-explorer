/**
 * React Query key constants for consistent cache management
 */

export const QUERY_KEYS = {
  POKEMON_LIST: ['pokemon-list'] as const,
  POKEMON_DETAIL: (name: string) => ['pokemon-detail', name] as const,
} as const;
