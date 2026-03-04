import { useEffect } from 'react';
import { useGenresStore } from '@/store/useGenresStore';

export const useGenres = () => {
  const { genres, loading, error, fetchGenres } = useGenresStore();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return {
    data: genres.length > 0 ? { results: genres } : null,
    loading,
    error,
  };
};
