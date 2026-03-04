import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import {
  RiTwitterLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiFacebookFill,
  RiGamepadLine,
  RiGameLine,
} from 'react-icons/ri';
import { usePlatforms } from '@/hooks/usePlatforms';
import { useGenres } from '@/hooks/useGenres';
import { useFilterStore } from '@/store/useFilterStore';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarDrawer = ({ isOpen, onClose }: SidebarDrawerProps) => {
  const {
    selectedCategories,
    selectedPlatforms,
    toggleCategory,
    togglePlatform,
    resetFilters,
  } = useFilterStore();

  const { data: platformsData, loading: platformsLoading, error: platformsError } = usePlatforms();
  const { data: genresData, loading: genresLoading, error: genresError } = useGenres();

  const platforms = platformsData?.results || [];
  const genres = genresData?.results || [];

  const handleReset = () => {
    resetFilters();
    onClose();
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
            className="lg:hidden z-40 fixed inset-0 bg-gradient-to-br from-purple-900/50 via-background/80 to-purple-900/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden top-0 left-0 z-50 fixed flex flex-col bg-gradient-to-b from-purple-dark to-background shadow-glow-multi border-primary/30 border-r w-full sm:w-80 h-full overflow-y-auto"
          >
            <div className="top-0 z-10 sticky flex justify-between items-center bg-gradient-to-r from-purple-900/80 to-transparent backdrop-blur-sm p-6 border-primary/20 border-b">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-accent font-bold text-transparent text-xl">
                Filters
              </h2>
              <button
                onClick={onClose}
                className="hover:bg-primary/20 hover:shadow-glow-purple p-2 rounded-lg transition-all"
                aria-label="Close filters"
              >
                <FiX className="text-accent" size={24} />
              </button>
            </div>

            <div className="flex-1 p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="bg-clip-text bg-gradient-to-r from-primary to-accent font-semibold text-transparent text-lg">
                  Active Filters
                </h4>
                <button
                  onClick={handleReset}
                  className="text-accent hover:text-cyan-bright text-sm hover:underline transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Genres Section */}
              <div className="mb-6">
                <h5 className="flex items-center gap-2 mb-3 font-semibold text-md text-primary">
                  <RiGameLine className="text-accent" />
                  Genres
                </h5>
                
                {genresLoading && (
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-purple-900/50 rounded h-6 shimmer" />
                    ))}
                  </div>
                )}

                {genresError && (
                  <p className="text-red-400 text-sm">Failed to load genres</p>
                )}

                {!genresLoading && !genresError && (
                  <div className="flex flex-col gap-2">
                    {genres.map((genre) => (
                      <div className="flex items-center gap-2" key={genre.id}>
                        <input
                          type="checkbox"
                          id={`drawer-genre-${genre.id}`}
                          checked={selectedCategories.includes(genre.id)}
                          onChange={() => toggleCategory(genre.id)}
                          className="bg-background checked:bg-gradient-to-r checked:from-primary checked:to-purple-600 border-primary/30 rounded focus:ring-2 focus:ring-primary w-4 h-4 transition-all cursor-pointer"
                        />
                        <label
                          htmlFor={`drawer-genre-${genre.id}`}
                          className="flex-1 text-gray-300 hover:text-primary text-sm transition-colors cursor-pointer"
                        >
                          {genre.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Platforms Section */}
              <div className="mb-6">
                <h5 className="flex items-center gap-2 mb-3 font-semibold text-md text-primary">
                  <RiGamepadLine className="text-accent" />
                  Platforms
                </h5>
                
                {platformsLoading && (
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-purple-900/50 rounded h-6 shimmer" />
                    ))}
                  </div>
                )}

                {platformsError && (
                  <p className="text-red-400 text-sm">Failed to load platforms</p>
                )}

                {!platformsLoading && !platformsError && (
                  <div className="flex flex-col gap-2">
                    {platforms.map((platform) => (
                      <div className="flex items-center gap-2" key={platform.id}>
                        <input
                          type="checkbox"
                          id={`drawer-platform-${platform.id}`}
                          checked={selectedPlatforms.includes(platform.id)}
                          onChange={() => togglePlatform(platform.id)}
                          className="bg-background checked:bg-gradient-to-r checked:from-accent checked:to-cyan-bright border-accent/30 rounded focus:ring-2 focus:ring-accent w-4 h-4 transition-all cursor-pointer"
                        />
                        <label
                          htmlFor={`drawer-platform-${platform.id}`}
                          className="flex-1 text-gray-300 hover:text-accent text-sm transition-colors cursor-pointer"
                        >
                          {platform.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bottom-0 sticky bg-gradient-to-r from-transparent to-purple-900/30 backdrop-blur-sm p-6 border-primary/20 border-t">
              <h3 className="mb-4 font-semibold text-accent text-sm uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com/?lang=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-primary to-primary hover:to-neon shadow-md hover:shadow-glow-purple rounded-lg w-11 h-11 hover:scale-110 transition-all"
                  aria-label="Twitter"
                >
                  <RiTwitterLine className="text-white" size={20} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-neon to-neon hover:to-accent shadow-md hover:shadow-glow-pink rounded-lg w-11 h-11 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <RiInstagramLine className="text-white" size={20} />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-accent to-accent hover:to-cyan-bright shadow-md hover:shadow-glow-cyan rounded-lg w-11 h-11 hover:scale-110 transition-all"
                  aria-label="YouTube"
                >
                  <RiYoutubeLine className="text-white" size={20} />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-primary to-primary hover:to-purple-500 shadow-md hover:shadow-glow-purple rounded-lg w-11 h-11 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <RiFacebookFill className="text-white" size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
