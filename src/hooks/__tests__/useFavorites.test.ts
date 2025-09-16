import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../useFavorites';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useFavorites', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('initial state', () => {
    it('starts with no favorites when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.favorites).toEqual([]);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('pokemon-favorites');
    });

    it('loads existing favorites from localStorage', () => {
      const storedFavorites = ['charmander', 'charizard'];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedFavorites));
      
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.favorites).toEqual(storedFavorites);
    });

    it('handles corrupted data without crashing', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');
      
      expect(() => {
        renderHook(() => useFavorites());
      }).not.toThrow();
    });
  });

  describe('isFavorite', () => {
    it('knows when a pokemon is favorited', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['charmander']));
      
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.isFavorite('charmander')).toBe(true);
    });

    it('should return false for non-favorited pokemon', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['charmander']));
      
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.isFavorite('charizard')).toBe(false);
    });

    it('should return false for empty strings', () => {
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.isFavorite('')).toBe(false);
    });
  });

  describe('toggleFavorite', () => {
    it('adds a pokemon to favorites', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
      
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite('charmander');
      });
      
      expect(result.current.favorites).toContain('charmander');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'pokemon-favorites',
        JSON.stringify(['charmander'])
      );
    });

    it('removes a pokemon from favorites', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['charmander', 'charizard']));
      
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite('charmander');
      });
      
      expect(result.current.favorites).not.toContain('charmander');
      expect(result.current.favorites).toContain('charizard');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'pokemon-favorites',
        JSON.stringify(['charizard'])
      );
    });

    it("doesn't create duplicates when toggling twice", () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['charmander']));
      
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite('charmander');
      });
      
      act(() => {
        result.current.toggleFavorite('charmander');
      });
      
      expect(result.current.favorites).not.toContain('charmander');
    });
  });
});
