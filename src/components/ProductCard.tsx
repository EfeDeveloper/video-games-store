import { memo } from 'react';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Game } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { LazyImage } from './LazyImage';

interface ProductCardProps {
  game: Game;
  onClick?: () => void;
}

export const ProductCard = memo(({ game, onClick }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const inWishlist = isInWishlist(game.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(game);
    toast.success(`${game.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(game.id);
      toast.error(`${game.name} removed from wishlist`);
    } else {
      addToWishlist(game);
      toast.success(`${game.name} added to wishlist!`);
    }
  };

  const platformNames = game.platforms
    ?.slice(0, 3)
    .map((p) => p.platform.name)
    .join(', ');

  return (
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-purple-dark to-purple-deep hover:shadow-glow-multi border border-primary/20 hover:border-primary/50 rounded-xl overflow-hidden hover:rotate-[0.5deg] hover:scale-[1.03] transition-all animate-fade-in duration-300 cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <LazyImage
          src={game.background_image || '/placeholder-game.jpg'}
          alt={game.name}
          className="group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-deep via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-neon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleToggleWishlist}
          className="top-3 right-3 absolute bg-black/60 hover:bg-gradient-to-br hover:from-neon/80 hover:to-pink-600 shadow-lg hover:shadow-glow-pink backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-all duration-200"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? (
            <FaHeart className="text-neon" size={18} />
          ) : (
            <FiHeart className="text-white" size={18} />
          )}
        </button>

        {game.metacritic && (
          <div className="top-3 left-3 absolute bg-gradient-to-r from-primary to-purple-600 shadow-glow-purple px-3 py-1 border border-primary/50 rounded-lg font-bold text-white text-sm">
            {game.metacritic}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-b from-purple-deep/50 to-transparent p-4">
        <h3 className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent mb-2 font-bold text-white group-hover:text-transparent text-lg line-clamp-1 transition-all duration-300">
          {game.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 border border-yellow-500/30 rounded-md">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="font-semibold text-yellow-300 text-sm">
              {game.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-400 text-xs">
            ({game.ratings_count} reviews)
          </span>
        </div>

        {platformNames && (
          <p className="bg-black/20 mb-3 px-2 py-1 rounded text-gray-400 text-xs line-clamp-1">
            {platformNames}
          </p>
        )}

        <div className="flex justify-between items-center">
          <span className="bg-clip-text bg-gradient-to-r from-accent to-cyan-bright font-bold text-transparent text-xl">
            $29.99
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-gradient-to-r from-primary hover:from-primary to-purple-600 hover:to-neon shadow-md hover:shadow-glow-purple px-4 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-200"
            aria-label="Add to cart"
          >
            <FiShoppingBag size={18} />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
});
