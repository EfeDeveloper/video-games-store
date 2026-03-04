import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiEye, FiTrash2, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { Game } from '@/types';
import { EmptyState } from './EmptyState';
import { Button } from './Button';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer = ({ isOpen, onClose }: WishlistDrawerProps) => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const handleAddToCart = (game: Game) => {
    addToCart(game);
    toast.success(`${game.name} added to cart`);
  };

  const handleViewDetails = (gameId: number) => {
    navigate(`/game/${gameId}`);
    onClose();
  };

  const handleRemove = (game: Game) => {
    removeFromWishlist(game.id);
    toast.error(`${game.name} removed from wishlist`);
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
                <div className="flex-1 space-y-2 p-4 overflow-y-auto">
                  {items.map((game) => (
                    <div
                      key={game.id}
                      className="group relative flex gap-3 bg-gradient-to-br from-purple-900/40 to-background shadow-lg hover:shadow-glow-pink p-3 border border-neon/20 hover:border-neon/40 rounded-lg transition-all duration-300"
                    >
                      <div className="relative flex-shrink-0 rounded-lg w-20 h-20 overflow-hidden">
                        <img
                          src={game.background_image || '/placeholder-game.jpg'}
                          alt={game.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      </div>
                      <div className="flex flex-col flex-1 justify-between min-w-0">
                        <div>
                          <h4 className="mb-1 font-semibold text-white text-sm line-clamp-1">
                            {game.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="font-semibold text-white text-xs">
                              {game.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleViewDetails(game.id)}
                            className="flex justify-center items-center bg-gradient-to-br from-accent/20 hover:from-accent/30 to-cyan-bright/20 hover:to-cyan-bright/30 hover:shadow-glow-cyan p-1.5 border border-accent/30 hover:border-accent/50 rounded transition-all"
                            aria-label="View details"
                            title="View details"
                          >
                            <FiEye className="text-accent" size={14} />
                          </button>
                          <button
                            onClick={() => handleAddToCart(game)}
                            className="flex flex-1 justify-center items-center gap-1.5 bg-gradient-to-r from-primary/20 hover:from-primary/30 to-purple-600/20 hover:to-purple-600/30 px-2 py-1.5 border border-primary/30 hover:border-primary/50 rounded font-semibold text-primary text-xs hover:scale-[1.02] transition-all"
                          >
                            <FiShoppingBag size={12} />
                            <span>Add</span>
                          </button>
                          <button
                            onClick={() => handleRemove(game)}
                            className="flex justify-center items-center hover:bg-red-500/20 hover:shadow-glow-pink p-1.5 border border-transparent hover:border-red-500/30 rounded text-red-400 hover:text-red-300 transition-all"
                            aria-label="Remove from wishlist"
                            title="Remove from wishlist"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-transparent via-red-500/10 to-transparent backdrop-blur-sm p-6 border-neon/20 border-t">
                  <Button
                    onClick={clearWishlist}
                    variant="danger"
                    size="md"
                    fullWidth
                  >
                    Clear Wishlist
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
