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
      className="group relative bg-[#27272A] hover:shadow-xl rounded-lg overflow-hidden hover:scale-[1.02] transition-all animate-fade-in duration-300 cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <LazyImage
          src={game.background_image || '/placeholder-game.jpg'}
          alt={game.name}
          className="group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#27272A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleToggleWishlist}
          className="top-3 right-3 absolute bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-all duration-200"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? (
            <FaHeart className="text-red-500" size={18} />
          ) : (
            <FiHeart className="text-white" size={18} />
          )}
        </button>

        {game.metacritic && (
          <div className="top-3 left-3 absolute bg-primary px-2 py-1 rounded font-bold text-white text-sm">
            {game.metacritic}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 font-bold text-white group-hover:text-primary text-lg line-clamp-1 transition-colors">
          {game.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="font-semibold text-secondary text-sm">
              {game.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-500 text-xs">
            ({game.ratings_count} reviews)
          </span>
        </div>

        {platformNames && (
          <p className="mb-3 text-gray-400 text-xs line-clamp-1">
            {platformNames}
          </p>
        )}

        <div className="flex justify-between items-center">
          <span className="font-bold text-primary text-xl">$29.99</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-200"
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
