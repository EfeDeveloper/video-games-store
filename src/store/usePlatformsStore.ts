import { create } from 'zustand';
import { Platform } from '@/types';
import { fetchPlatforms } from '@/services/gamesApi';

interface PlatformsStore {
  platforms: Platform[];
  loading: boolean;
  error: Error | null;
  hasFetched: boolean;
  fetchPlatforms: () => Promise<void>;
}

export const usePlatformsStore = create<PlatformsStore>((set, get) => ({
  platforms: [],
  loading: false,
  error: null,
  hasFetched: false,

  fetchPlatforms: async () => {
    // Si ya está cargando o ya tenemos datos, no hacer otra petición
    const { loading, hasFetched } = get();
    if (loading || hasFetched) return;

    set({ loading: true, error: null });

    try {
      const data = await fetchPlatforms();
      set({ 
        platforms: data.results, 
        loading: false, 
        hasFetched: true,
        error: null 
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch platforms'),
        loading: false,
      });
    }
  },
}));
