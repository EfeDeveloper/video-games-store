import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { useGames } from '@/hooks/useGames';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ProductGrid } from './ProductGrid';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { SearchBar } from './SearchBar';
import { SortDropdown } from './SortDropdown';
import { ActiveFilters } from './ActiveFilters';
import { Game } from '@/types';

interface ContentProps {
  onOpenFilters: () => void;
}

const Content = ({ onOpenFilters }: ContentProps) => {
  const {
    games,
    loading,
    loadingMore,
    error,
    reset,
    count,
    hasMore,
    loadMore,
  } = useGames();
  const navigate = useNavigate();

  const { observerTarget } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
  });

  const handleGameClick = useCallback(
    (game: Game) => {
      navigate(`/game/${game.id}`);
    },
    [navigate]
  );

  return (
    <div className="flex flex-col content">
      <div className="top-0 z-10 sticky bg-background border-gray-800 border-b">
        <div className="p-6 pb-4">
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenFilters}
                className="lg:hidden flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                aria-label="Open filters"
              >
                <FiFilter className="text-white" size={20} />
                <span className="font-medium text-white text-sm">Filters</span>
              </button>
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>
            <div className="flex justify-between sm:justify-start items-center gap-4 w-full sm:w-auto">
              <span className="text-gray-400 text-sm">
                {count > 0 && `${count} games`}
              </span>
              <SortDropdown />
            </div>
          </div>
        </div>
        <ActiveFilters />
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {loading && <Loader />}
        {error && <ErrorMessage message={error.message} onRetry={reset} />}
        {!loading && !error && (
          <>
            <ProductGrid games={games} onGameClick={handleGameClick} />
            {loadingMore && (
              <div className="flex justify-center items-center py-8">
                <div className="border-primary border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            )}
            {hasMore && <div ref={observerTarget} className="h-20" />}
            {!hasMore && games.length > 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-400 text-sm">No more games to load</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
