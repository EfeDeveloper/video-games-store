import { create } from 'zustand';
import { Category } from '@/types';
import { fetchGenres } from '@/services/gamesApi';

interface GenresStore {
  genres: Category[];
  loading: boolean;
  error: Error | null;
  hasFetched: boolean;
  fetchGenres: () => Promise<void>;
}

export const useGenresStore = create<GenresStore>((set, get) => ({
  genres: [],
  loading: false,
  error: null,
  hasFetched: false,

  fetchGenres: async () => {
    // Si ya está cargando o ya tenemos datos, no hacer otra petición
    const { loading, hasFetched } = get();
    if (loading || hasFetched) return;

    set({ loading: true, error: null });

    try {
      const data = await fetchGenres();
      set({ 
        genres: data.results, 
        loading: false, 
        hasFetched: true,
        error: null 
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch genres'),
        loading: false,
      });
    }
  },
}));
