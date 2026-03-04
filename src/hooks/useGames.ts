import { useState, useEffect, useRef } from 'react';
import { fetchGames } from '@/services/gamesApi';
import { useFilterStore } from '@/store/useFilterStore';
import { GamesResponse, Game } from '@/types';

export const useGames = () => {
  const [data, setData] = useState<GamesResponse | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const prevFiltersRef = useRef<string>('');

  const { searchQuery, selectedCategories, selectedPlatforms, sortBy } =
    useFilterStore();

  useEffect(() => {
    const currentFilters = JSON.stringify({
      searchQuery,
      selectedCategories,
      selectedPlatforms,
      sortBy,
    });

    const filtersChanged = prevFiltersRef.current !== currentFilters;

    if (filtersChanged) {
      setPage(1);
      setGames([]);
      prevFiltersRef.current = currentFilters;
    }

    const loadGames = async () => {
      if (filtersChanged) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        // For genres, we'll use IDs directly (API accepts both IDs and slugs for genres)
        const genreIds = selectedCategories;

        // For platforms, we MUST use numeric IDs (API only accepts IDs for platforms)
        const platformIds = selectedPlatforms;

        const params: {
          page: number;
          search?: string;
          genres?: string;
          platforms?: string;
          ordering?: string;
        } = {
          page,
        };

        if (searchQuery) {
          params.search = searchQuery;
        }

        if (genreIds.length > 0) {
          params.genres = genreIds.join(',');
        }

        if (platformIds.length > 0) {
          params.platforms = platformIds.join(',');
        }

        if (sortBy !== 'relevance') {
          params.ordering = sortBy;
        }

        const result = await fetchGames(params);
        setData(result);

        if (filtersChanged || page === 1) {
          setGames(result.results);
        } else {
          setGames((prev) => [...prev, ...result.results]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch games')
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    loadGames();
  }, [searchQuery, selectedCategories, selectedPlatforms, sortBy, page]);

  const loadMore = () => {
    if (data?.next && !loadingMore) {
      setPage((prev) => prev + 1);
    }
  };

  const reset = () => {
    setPage(1);
    setGames([]);
    setData(null);
  };

  return {
    games,
    count: data?.count || 0,
    loading,
    loadingMore,
    error,
    hasMore: !!data?.next,
    loadMore,
    reset,
  };
};
