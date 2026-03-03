import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { Game } from '@/types';
import { EmptyState } from './EmptyState';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer = ({ isOpen, onClose }: WishlistDrawerProps) => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (game: Game) => {
    addToCart(game);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="z-40 fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="top-0 right-0 z-50 fixed flex flex-col bg-background shadow-2xl w-full sm:w-96 h-full"
          >
            <div className="flex justify-between items-center p-6 border-gray-700 border-b">
              <div className="flex items-center gap-2">
                <FiHeart className="text-red-500" size={24} />
                <h2 className="font-bold text-white text-xl">
                  Wishlist ({items.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-gray-700 p-2 rounded-lg transition-colors"
                aria-label="Close wishlist"
              >
                <FiX className="text-white" size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1">
                <EmptyState
                  icon={<FiHeart size={64} />}
                  title="Your wishlist is empty"
                  description="Save your favorite games here and never lose track of what you want to play!"
                />
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 p-4 overflow-y-auto">
                  {items.map((game) => (
                    <div
                      key={game.id}
                      className="bg-[#27272A] rounded-lg overflow-hidden"
                    >
                      <img
                        src={game.background_image || '/placeholder-game.jpg'}
                        alt={game.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="mb-2 font-semibold text-white line-clamp-1">
                          {game.name}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-yellow-400">★</span>
                          <span className="text-secondary text-sm">
                            {game.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(game)}
                            className="flex flex-1 justify-center items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg font-semibold text-white transition-colors"
                          >
                            <FiShoppingBag size={16} />
                            <span className="text-sm">Add to Cart</span>
                          </button>
                          <button
                            onClick={() => removeFromWishlist(game.id)}
                            className="hover:bg-red-500/10 p-2 rounded-lg text-red-500 transition-colors"
                            aria-label="Remove from wishlist"
                          >
                            <FiX size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-gray-700 border-t">
                  <button
                    onClick={clearWishlist}
                    className="hover:bg-red-500/10 py-2 rounded-lg w-full font-semibold text-red-500 text-sm transition-colors"
                  >
                    Clear Wishlist
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
