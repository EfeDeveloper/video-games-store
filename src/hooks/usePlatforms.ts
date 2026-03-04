import { useEffect } from 'react';
import { usePlatformsStore } from '@/store/usePlatformsStore';

export const usePlatforms = () => {
  const { platforms, loading, error, fetchPlatforms } = usePlatformsStore();

  useEffect(() => {
    fetchPlatforms();
  }, [fetchPlatforms]);

  return {
    data: platforms.length > 0 ? { results: platforms } : null,
    loading,
    error,
  };
};
