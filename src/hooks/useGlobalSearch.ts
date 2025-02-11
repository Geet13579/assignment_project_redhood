// hooks/useGlobalSearch.ts
import { create } from 'zustand';

interface GlobalSearchState {
  searchQuery: string;
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  resetSearch: () => void;
}

export const useGlobalSearch = create<GlobalSearchState>((set) => ({
  searchQuery: '',
  isLoading: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  resetSearch: () => set({ searchQuery: '', isLoading: false })
}));