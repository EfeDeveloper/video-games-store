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
            className="z-40 fixed inset-0 bg-gradient-to-br from-purple-900/50 via-background/80 to-purple-900/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="top-0 right-0 z-50 fixed flex flex-col bg-gradient-to-b from-purple-dark to-background shadow-glow-multi border-neon/30 border-l w-full sm:w-96 h-full"
          >
            <div className="flex justify-between items-center bg-gradient-to-r from-red-500/20 via-pink-500/20 to-transparent backdrop-blur-sm p-6 border-neon/20 border-b">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-gradient-to-br from-red-500 to-pink-600 shadow-lg shadow-red-500/50 rounded-lg w-10 h-10">
                  <FiHeart className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-white text-xl">
                    Wishlist
                  </h2>
                  <p className="text-neon text-xs">
                    {items.length} {items.length === 1 ? 'game' : 'games'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-neon/20 hover:shadow-glow-pink p-2 rounded-lg transition-all"
                aria-label="Close wishlist"
              >
                <FiX className="text-neon" size={24} />
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
                      className="group relative bg-gradient-to-br from-purple-900/40 to-background shadow-lg hover:shadow-glow-pink border border-neon/20 hover:border-neon/40 rounded-lg overflow-hidden transition-all duration-300"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={game.background_image || '/placeholder-game.jpg'}
                          alt={game.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h4 className="mb-2 font-semibold text-white line-clamp-1">
                          {game.name}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-yellow-400 text-lg">★</span>
                          <span className="font-semibold text-white text-sm">
                            {game.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-400 text-xs">/ 5.0</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(game)}
                            className="flex flex-1 justify-center items-center gap-2 bg-gradient-to-r from-primary hover:from-primary/90 to-purple-600 hover:to-purple-700 shadow-md shadow-primary/50 px-3 py-2 rounded-lg font-semibold text-white text-sm hover:scale-[1.02] transition-all"
                          >
                            <FiShoppingBag size={16} />
                            <span>Add to Cart</span>
                          </button>
                          <button
                            onClick={() => removeFromWishlist(game.id)}
                            className="hover:bg-red-500/20 hover:shadow-glow-pink p-2 rounded-lg text-red-400 hover:text-red-300 transition-all"
                            aria-label="Remove from wishlist"
                          >
                            <FiX size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-transparent via-red-500/10 to-transparent backdrop-blur-sm p-6 border-neon/20 border-t">
                  <button
                    onClick={clearWishlist}
                    className="bg-gradient-to-r from-red-500/20 hover:from-red-500/30 to-pink-500/20 hover:to-pink-500/30 hover:shadow-glow-pink py-3 border border-red-500/30 hover:border-red-500/50 rounded-lg w-full font-semibold text-red-400 hover:text-red-300 text-sm transition-all"
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
