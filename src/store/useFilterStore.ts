import { create } from 'zustand';
import { FilterState, SortOption } from '@/types';

interface FilterStore extends FilterState {
  setSearchQuery: (query: string) => void;
  toggleCategory: (categoryId: number) => void;
  togglePlatform: (platformId: number) => void;
  setSortBy: (sortBy: SortOption) => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
}

const initialState: FilterState = {
  searchQuery: '',
  selectedCategories: [],
  selectedPlatforms: [],
  sortBy: 'relevance',
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...initialState,

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  toggleCategory: (categoryId) => {
    const { selectedCategories } = get();
    const exists = selectedCategories.includes(categoryId);

    set({
      selectedCategories: exists
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId],
    });
  },

  togglePlatform: (platformId) => {
    const { selectedPlatforms } = get();
    const exists = selectedPlatforms.includes(platformId);

    set({
      selectedPlatforms: exists
        ? selectedPlatforms.filter((id) => id !== platformId)
        : [...selectedPlatforms, platformId],
    });
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
  },

  resetFilters: () => {
    set(initialState);
  },

  getActiveFiltersCount: () => {
    const state = get();
    let count = 0;

    if (state.searchQuery) count++;
    count += state.selectedCategories.length;
    count += state.selectedPlatforms.length;
    if (state.sortBy !== 'relevance') count++;

    return count;
  },
}));
