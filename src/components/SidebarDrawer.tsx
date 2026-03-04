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
            className="z-40 fixed inset-0 bg-gradient-to-br from-purple-900/50 via-background/80 to-purple-900/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="top-0 left-0 z-50 fixed flex flex-col bg-gradient-to-b from-purple-dark to-background shadow-glow-multi border-primary/30 border-r w-full sm:w-80 md:w-96 lg:w-[420px] 2xl:w-[520px] xl:w-[480px] h-full overflow-y-auto"
          >
            <div className="top-0 z-10 sticky flex justify-between items-center bg-gradient-to-r from-primary/10 via-purple-600/10 to-transparent backdrop-blur-md p-4 border-primary/20 border-b">
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 rounded-lg w-9 h-9">
                  <span className="font-bold text-primary text-lg">⚙</span>
                </div>
                <h2 className="font-bold text-white text-lg">
                  Filters
                </h2>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-primary/20 hover:shadow-glow-purple p-2 rounded-lg transition-all"
                aria-label="Close filters"
              >
                <FiX className="text-primary" size={22} />
              </button>
            </div>

            <div className="flex-1 p-4">
              <div className="flex justify-between items-center mb-5">
                <h4 className="font-semibold text-white text-base tracking-tight">
                  Active Filters
                </h4>
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-red-500/20 hover:from-red-500/30 to-pink-500/20 hover:to-pink-500/30 hover:shadow-glow-pink px-3 py-1.5 border border-red-500/30 hover:border-red-500/50 rounded-full font-medium text-red-400 hover:text-red-300 text-xs hover:scale-105 transition-all"
                >
                  Reset All
                </button>
              </div>

              {/* Genres Section */}
              <div className="mb-6">
                <h5 className="flex items-center gap-2 mb-4 font-semibold text-white text-base">
                  <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg w-8 h-8">
                    <RiGameLine className="text-accent" size={18} />
                  </div>
                  Genres
                </h5>
                
                {genresLoading && (
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-purple-900/30 px-4 py-2 rounded-full w-24 h-9 shimmer" />
                    ))}
                  </div>
                )}

                {genresError && (
                  <p className="text-red-400 text-sm">Failed to load genres</p>
                )}

                {!genresLoading && !genresError && (
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => toggleCategory(genre.id)}
                        className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                          selectedCategories.includes(genre.id)
                            ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/40 hover:shadow-primary/60'
                            : 'bg-purple-900/30 text-gray-300 hover:bg-purple-900/50 hover:text-white border border-purple-700/40 hover:border-purple-600/60'
                        }`}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Platforms Section */}
              <div className="mb-6">
                <h5 className="flex items-center gap-2 mb-4 font-semibold text-white text-base">
                  <div className="flex justify-center items-center bg-gradient-to-br from-accent/20 to-cyan-bright/20 rounded-lg w-8 h-8">
                    <RiGamepadLine className="text-accent" size={18} />
                  </div>
                  Platforms
                </h5>
                
                {platformsLoading && (
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-purple-900/30 px-4 py-2 rounded-full w-20 h-9 shimmer" />
                    ))}
                  </div>
                )}

                {platformsError && (
                  <p className="text-red-400 text-sm">Failed to load platforms</p>
                )}

                {!platformsLoading && !platformsError && (
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                          selectedPlatforms.includes(platform.id)
                            ? 'bg-gradient-to-r from-accent to-cyan-bright text-white shadow-lg shadow-accent/40 hover:shadow-accent/60'
                            : 'bg-purple-900/30 text-gray-300 hover:bg-purple-900/50 hover:text-white border border-purple-700/40 hover:border-purple-600/60'
                        }`}
                      >
                        {platform.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bottom-0 sticky bg-gradient-to-r from-transparent via-primary/5 to-transparent backdrop-blur-md p-4 border-primary/20 border-t">
              <h3 className="mb-3 font-semibold text-gray-400 text-xs uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex gap-2">
                <a
                  href="https://twitter.com/?lang=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-primary/10 hover:from-primary/20 to-purple-600/10 hover:to-purple-600/20 shadow-sm hover:shadow-md hover:shadow-primary/30 border border-primary/20 hover:border-primary/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
                  aria-label="Twitter"
                >
                  <RiTwitterLine className="text-primary" size={18} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-neon/10 hover:from-neon/20 to-pink-500/10 hover:to-pink-500/20 shadow-sm hover:shadow-md hover:shadow-neon/30 border border-neon/20 hover:border-neon/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <RiInstagramLine className="text-neon" size={18} />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-accent/10 hover:from-accent/20 to-cyan-bright/10 hover:to-cyan-bright/20 shadow-sm hover:shadow-accent/30 hover:shadow-md border border-accent/20 hover:border-accent/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
                  aria-label="YouTube"
                >
                  <RiYoutubeLine className="text-accent" size={18} />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gradient-to-br from-primary/10 hover:from-primary/20 to-purple-500/10 hover:to-purple-500/20 shadow-sm hover:shadow-md hover:shadow-primary/30 border border-primary/20 hover:border-primary/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <RiFacebookFill className="text-primary" size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
