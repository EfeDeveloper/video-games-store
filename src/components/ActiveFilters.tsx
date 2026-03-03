import { FiX } from 'react-icons/fi';
import { categories } from '@/common/constants/categories';
import { platforms } from '@/common/constants/platforms';
import { useFilterStore } from '@/store/useFilterStore';

export const ActiveFilters = () => {
  const {
    selectedCategories,
    selectedPlatforms,
    searchQuery,
    priceRange,
    sortBy,
    toggleCategory,
    togglePlatform,
    setSearchQuery,
    resetFilters,
    getActiveFiltersCount,
  } = useFilterStore();

  const activeCount = getActiveFiltersCount();

  if (activeCount === 0) {
    return null;
  }

  const getCategoryLabel = (id: number) => {
    return categories.find((c) => c.id === id)?.label || '';
  };

  const getPlatformLabel = (id: number) => {
    return platforms.find((p) => p.id === id)?.label || '';
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
    <div className="flex flex-wrap items-center gap-2 bg-[#27272A]/50 px-6 py-3 border-gray-800 border-b">
      <span className="font-medium text-gray-400 text-sm">Active filters:</span>

      {searchQuery && (
        <div className="flex items-center gap-1 bg-primary/20 hover:bg-primary/30 px-3 py-1 border border-primary rounded-full transition-all animate-fade-in duration-200">
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
          className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1 border border-blue-500 rounded-full transition-all animate-fade-in duration-200"
        >
          <span className="font-medium text-blue-400 text-xs">
            {getCategoryLabel(categoryId)}
          </span>
          <button
            onClick={() => toggleCategory(categoryId)}
            className="hover:bg-blue-500/30 p-0.5 rounded-full hover:scale-110 transition-all duration-200"
            aria-label={`Remove ${getCategoryLabel(categoryId)} filter`}
          >
            <FiX size={14} className="text-blue-400" />
          </button>
        </div>
      ))}

      {selectedPlatforms.map((platformId) => (
        <div
          key={`platform-${platformId}`}
          className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/30 px-3 py-1 border border-green-500 rounded-full transition-all animate-fade-in duration-200"
        >
          <span className="font-medium text-green-400 text-xs">
            {getPlatformLabel(platformId)}
          </span>
          <button
            onClick={() => togglePlatform(platformId)}
            className="hover:bg-green-500/30 p-0.5 rounded-full hover:scale-110 transition-all duration-200"
            aria-label={`Remove ${getPlatformLabel(platformId)} filter`}
          >
            <FiX size={14} className="text-green-400" />
          </button>
        </div>
      ))}

      {(priceRange.min > 0 || priceRange.max < 100) && (
        <div className="flex items-center gap-1 bg-purple-500/20 hover:bg-purple-500/30 px-3 py-1 border border-purple-500 rounded-full transition-all animate-fade-in duration-200">
          <span className="font-medium text-purple-400 text-xs">
            Price: ${priceRange.min} - ${priceRange.max}
          </span>
        </div>
      )}

      {sortBy !== 'relevance' && (
        <div className="flex items-center gap-1 bg-orange-500/20 hover:bg-orange-500/30 px-3 py-1 border border-orange-500 rounded-full transition-all animate-fade-in duration-200">
          <span className="font-medium text-orange-400 text-xs">
            Sort: {getSortLabel(sortBy)}
          </span>
        </div>
      )}

      <button
        onClick={resetFilters}
        className="ml-auto font-medium text-red-400 hover:text-red-300 text-xs hover:scale-105 transition-all duration-200"
      >
        Clear all
      </button>
    </div>
  );
};
