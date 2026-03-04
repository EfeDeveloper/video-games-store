import { memo, useCallback } from 'react';
import { Game } from '@/types';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState';

interface ProductGridProps {
  games: Game[];
  onGameClick?: (game: Game) => void;
}

export const ProductGrid = memo(({ games, onGameClick }: ProductGridProps) => {
  const handleGameClick = useCallback(
    (game: Game) => {
      onGameClick?.(game);
    },
    [onGameClick]
  );

  if (games.length === 0) {
    return (
      <EmptyState
        icon="🎮"
        title="No games found"
        description="Try adjusting your filters or search query to discover amazing games"
      />
    );
  }

  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-6 xl:grid-cols-4">
      {games.map((game) => (
        <ProductCard
          key={game.id}
          game={game}
          onClick={() => handleGameClick(game)}
        />
      ))}
    </div>
  );
});
