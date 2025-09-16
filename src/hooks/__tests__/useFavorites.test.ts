import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../useFavorites';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStorage = new Map();
const localStorageMock = {
    getItem: vi.fn((key) => mockStorage.get(key) || null),
    setItem: vi.fn((key, value) => mockStorage.set(key, value)),
    removeItem: vi.fn((key) => mockStorage.delete(key)),
    clear: vi.fn(() => mockStorage.clear()),
};

beforeEach(() => {
    mockStorage.clear();
});

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
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.favorites).toHaveLength(0);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('pokemon-favorites');
    });

    it('loads existing favorites from localStorage', () => {
      const storedFavorites = ['charmander', 'bulbasaur'];
      mockStorage.set('pokemon-favorites', JSON.stringify(storedFavorites));
      
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.favorites).toEqual(storedFavorites);
    });

    it('handles corrupted data without crashing', () => {
      mockStorage.set('pokemon-favorites', 'invalid-json');
      
      expect(() => {
        renderHook(() => useFavorites());
      }).not.toThrow();
    });
  });

  describe('isFavorite', () => {
    it('should return true when a pokemon is favorited', () => {
      mockStorage.set('pokemon-favorites', JSON.stringify(['charmander']));
      
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.isFavorite('charmander')).toBe(true);
    });

    it('should return false for non-favorited pokemon', () => {
      mockStorage.set('pokemon-favorites', JSON.stringify(['charmander']));
      
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.isFavorite('bulbasaur')).toBe(false);
    });

    it('should return false for empty strings', () => {
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.isFavorite('')).toBe(false);
    });
  });

  describe('toggleFavorite', () => {
    it('should add a pokemon to favorites', () => {
     
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

    it('should remove a pokemon from favorites', () => {
      mockStorage.set('pokemon-favorites', JSON.stringify(['charmander', 'bulbasaur']));

      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite('charmander');
      });

      expect(result.current.favorites).not.toContain('charmander');
      expect(result.current.favorites).toContain('bulbasaur');
    });

    it('should not duplicate when toggling twice existing favorite', () => {
      mockStorage.set('pokemon-favorites', JSON.stringify(['charmander']));

      const { result } = renderHook(() => useFavorites());

     
      act(() => {
        result.current.toggleFavorite('charmander');
      });

      expect(result.current.favorites).not.toContain('charmander');

      
      act(() => {
        result.current.toggleFavorite('charmander');
      });

      expect(result.current.favorites).toContain('charmander');
      expect(result.current.favorites.filter(name => name === 'charmander')).toHaveLength(1);
    });
  });
});
