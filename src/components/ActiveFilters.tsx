import { FiX } from 'react-icons/fi';
import { usePlatforms } from '@/hooks/usePlatforms';
import { useGenres } from '@/hooks/useGenres';
import { useFilterStore } from '@/store/useFilterStore';

export const ActiveFilters = () => {
  const {
    selectedCategories,
    selectedPlatforms,
    searchQuery,
    sortBy,
    toggleCategory,
    togglePlatform,
    setSearchQuery,
    resetFilters,
    getActiveFiltersCount,
  } = useFilterStore();

  const { data: platformsData } = usePlatforms();
  const { data: genresData } = useGenres();

  const platforms = platformsData?.results || [];
  const genres = genresData?.results || [];

  const activeCount = getActiveFiltersCount();

  if (activeCount === 0) {
    return null;
  }

  const getCategoryLabel = (id: number) => {
    return genres.find((c) => c.id === id)?.name || '';
  };

  const getPlatformLabel = (id: number) => {
    return platforms.find((p) => p.id === id)?.name || '';
  };

  const getSortLabel = (sort: string) => {
    const labels: Record<string, string> = {
      relevance: 'Relevance',
      name: 'Name (A-Z)',
      '-name': 'Name (Z-A)',
      released: 'Release Date (Old)',
      '-released': 'Release Date (New)',
      rating: 'Rating (Low-High)',
      '-rating': 'Top Rated',
      metacritic: 'Metacritic (Low-High)',
      '-metacritic': 'Metacritic (High-Low)',
    };
    return labels[sort] || sort;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gradient-to-r from-purple-deep/50 to-purple-dark/50 backdrop-blur-sm px-6 py-3 border-primary/20 border-b">
      <span className="font-medium text-gray-400 text-sm">Active filters:</span>

      {searchQuery && (
        <div className="flex items-center gap-1 bg-gradient-to-r from-primary/20 hover:from-primary/30 to-purple-600/20 hover:to-purple-600/30 shadow-sm hover:shadow-glow-purple px-3 py-1 border border-primary/50 rounded-full transition-all animate-fade-in duration-200">
          <span className="font-medium text-primary text-xs">
            Search: "{searchQuery}"
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="hover:bg-primary/30 p-0.5 rounded-full hover:scale-110 transition-all duration-200"
            aria-label="Remove search filter"
          >
            <FiX size={14} className="text-primary" />
          </button>
        </div>
      )}

      {selectedCategories.map((categoryId) => (
        <div
          key={`category-${categoryId}`}
          className="flex items-center gap-1 bg-gradient-to-r from-primary/20 hover:from-primary/30 to-purple-500/20 hover:to-purple-500/30 shadow-sm hover:shadow-glow-purple px-3 py-1 border border-primary/50 rounded-full hover:scale-105 transition-all animate-fade-in duration-200"
        >
          <span className="font-medium text-primary text-xs">
            {getCategoryLabel(categoryId)}
          </span>
          <button
            onClick={() => toggleCategory(categoryId)}
            className="hover:bg-primary/30 p-0.5 rounded-full hover:scale-110 transition-all duration-200"
            aria-label={`Remove ${getCategoryLabel(categoryId)} filter`}
          >
            <FiX size={14} className="text-primary" />
          </button>
        </div>
      ))}

      {selectedPlatforms.map((platformId) => (
        <div
          key={`platform-${platformId}`}
          className="flex items-center gap-1 bg-gradient-to-r from-accent/20 hover:from-accent/30 to-cyan-bright/20 hover:to-cyan-bright/30 shadow-sm hover:shadow-glow-cyan px-3 py-1 border border-accent/50 rounded-full hover:scale-105 transition-all animate-fade-in duration-200"
        >
          <span className="font-medium text-accent text-xs">
            {getPlatformLabel(platformId)}
          </span>
          <button
            onClick={() => togglePlatform(platformId)}
            className="hover:bg-accent/30 p-0.5 rounded-full hover:scale-110 transition-all duration-200"
            aria-label={`Remove ${getPlatformLabel(platformId)} filter`}
          >
            <FiX size={14} className="text-accent" />
          </button>
        </div>
      ))}

      {sortBy !== 'relevance' && (
        <div className="flex items-center gap-1 bg-gradient-to-r from-neon/20 hover:from-neon/30 to-pink-500/20 hover:to-pink-500/30 shadow-sm hover:shadow-glow-pink px-3 py-1 border border-neon/50 rounded-full transition-all animate-fade-in duration-200">
          <span className="font-medium text-neon text-xs">
            Sort: {getSortLabel(sortBy)}
          </span>
        </div>
      )}

      <button
        onClick={resetFilters}
        className="ml-auto font-semibold text-red-400 hover:text-red-300 text-xs hover:underline hover:scale-105 transition-all duration-200"
      >
        Clear all
      </button>
    </div>
  );
};
