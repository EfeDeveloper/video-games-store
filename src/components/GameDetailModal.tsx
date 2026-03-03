import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiShoppingBag,
  FiHeart,
  FiCalendar,
  FiStar,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGameDetails } from '@/services/gamesApi';
import { Game } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { EmptyState } from './EmptyState';

export const GameDetailModal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  useEffect(() => {
    if (!id) return;

    const loadGameDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGameDetails(Number(id));
        setGame(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load game details')
        );
      } finally {
        setLoading(false);
      }
    };

    loadGameDetails();
  }, [id]);

  const handleClose = () => {
    navigate('/');
  };

  const handleAddToCart = () => {
    if (game) {
      addToCart(game);
      toast.success(`${game.name} added to cart!`);
    }
  };

  const handleToggleWishlist = () => {
    if (game) {
      if (isInWishlist(game.id)) {
        removeFromWishlist(game.id);
        toast.error(`${game.name} removed from wishlist`);
      } else {
        addToWishlist(game);
        toast.success(`${game.name} added to wishlist!`);
      }
    }
  };

  const inWishlist = game ? isInWishlist(game.id) : false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="z-50 fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-detail-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#27272A] shadow-2xl my-8 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center p-20"
            >
              <div className="mb-4 border-primary border-t-2 border-b-2 rounded-full w-16 h-16 animate-spin"></div>
              <p className="text-gray-400 text-sm animate-pulse">
                Loading game details...
              </p>
            </motion.div>
          )}

          {error && (
            <EmptyState
              icon={<FiX size={64} className="text-red-500" />}
              title="Failed to load game details"
              description="We couldn't load the game information. Please try again."
              action={{
                label: 'Close',
                onClick: handleClose,
              }}
            />
          )}

          {game && !loading && (
            <>
              <div className="relative">
                <img
                  src={game.background_image || '/placeholder-game.jpg'}
                  alt={game.name}
                  className="rounded-t-xl w-full h-80 object-cover"
                />
                <button
                  onClick={handleClose}
                  className="top-4 right-4 absolute bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full hover:rotate-90 hover:scale-110 transition-all duration-200"
                  aria-label="Close modal"
                >
                  <FiX className="text-white" size={24} />
                </button>
                {game.metacritic && (
                  <div className="top-4 left-4 absolute bg-primary px-3 py-2 rounded-lg font-bold text-white text-lg">
                    {game.metacritic}
                  </div>
                )}
              </div>

              <div className="p-8">
                <h1
                  id="game-detail-title"
                  className="mb-4 font-bold text-white text-4xl"
                >
                  {game.name}
                </h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                    <FiStar className="text-yellow-400" />
                    <span className="font-semibold text-white">
                      {game.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ({game.ratings_count})
                    </span>
                  </div>

                  {game.released && (
                    <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                      <FiCalendar className="text-gray-400" />
                      <span className="text-white">
                        {new Date(game.released).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {game.playtime > 0 && (
                    <div className="bg-background px-4 py-2 rounded-lg">
                      <span className="text-white">
                        {game.playtime}h playtime
                      </span>
                    </div>
                  )}
                </div>

                {game.genres && game.genres.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 font-semibold text-white text-lg">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {game.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-primary/20 px-3 py-1 rounded-full text-primary text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {game.platforms && game.platforms.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 font-semibold text-white text-lg">
                      Platforms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {game.platforms.map((p) => (
                        <span
                          key={p.platform.id}
                          className="bg-background px-3 py-1 rounded-lg text-gray-300 text-sm"
                        >
                          {p.platform.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {game.description_raw && (
                  <div className="mb-8">
                    <h3 className="mb-3 font-semibold text-white text-lg">
                      About
                    </h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {game.description_raw}
                    </p>
                  </div>
                )}

                {game.developers && game.developers.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-2 font-semibold text-white text-lg">
                      Developers
                    </h3>
                    <p className="text-gray-300">
                      {game.developers.map((dev) => dev.name).join(', ')}
                    </p>
                  </div>
                )}

                {game.publishers && game.publishers.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-2 font-semibold text-white text-lg">
                      Publishers
                    </h3>
                    <p className="text-gray-300">
                      {game.publishers.map((pub) => pub.name).join(', ')}
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-6 border-gray-700 border-t">
                  <div className="flex-1">
                    <div className="mb-4 font-bold text-primary text-3xl">
                      $29.99
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="flex flex-1 justify-center items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-200"
                      >
                        <FiShoppingBag size={20} />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        onClick={handleToggleWishlist}
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                          inWishlist
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                        aria-label={
                          inWishlist
                            ? 'Remove from wishlist'
                            : 'Add to wishlist'
                        }
                      >
                        {inWishlist ? (
                          <FaHeart className="text-white" size={20} />
                        ) : (
                          <FiHeart className="text-white" size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
