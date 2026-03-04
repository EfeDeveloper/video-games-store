import { useState } from 'react';
import {
  RiTwitterLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiFacebookFill,
  RiGamepadLine,
  RiGameLine,
} from 'react-icons/ri';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlatforms } from '@/hooks/usePlatforms';
import { useGenres } from '@/hooks/useGenres';
import { useFilterStore } from '@/store/useFilterStore';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden lg:block relative sidebar"
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="top-4 right-2 z-10 absolute flex justify-center items-center bg-gradient-to-br from-primary/20 hover:from-primary/30 to-purple-600/20 hover:to-purple-600/30 shadow-lg shadow-primary/30 hover:shadow-primary/50 border border-primary/30 hover:border-primary/50 rounded-full w-8 h-8 hover:scale-110 transition-all"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <FiChevronRight className="text-primary" size={18} />
        ) : (
          <FiChevronLeft className="text-primary" size={18} />
        )}
      </button>

      {/* Filter */}
      <div className="bg-gradient-to-b from-purple-dark to-purple-deep shadow-lg border-accent border-l-4 sidebar-filter">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="bg-clip-text bg-gradient-to-r from-primary to-accent font-bold text-transparent text-lg">
                  Filters
                </h4>
                <button
                  onClick={resetFilters}
                  className="text-accent hover:text-cyan-bright text-sm hover:underline transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Categories/Genres Section */}
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
                  <div className="flex flex-col gap-2 pr-2 max-h-60 overflow-y-auto">
                    {genres.map((genre) => (
                      <div className="flex items-center gap-2" key={genre.id}>
                        <input
                          type="checkbox"
                          id={`genre-${genre.id}`}
                          checked={selectedCategories.includes(genre.id)}
                          onChange={() => toggleCategory(genre.id)}
                          className="bg-background checked:bg-gradient-to-r checked:from-primary checked:to-purple-600 border-primary/30 rounded focus:ring-2 focus:ring-primary w-4 h-4 transition-all cursor-pointer"
                        />
                        <label
                          htmlFor={`genre-${genre.id}`}
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
                  <div className="flex flex-col gap-2 pr-2 max-h-60 overflow-y-auto">
                    {platforms.map((platform) => (
                      <div className="flex items-center gap-2" key={platform.id}>
                        <input
                          type="checkbox"
                          id={`platform-${platform.id}`}
                          checked={selectedPlatforms.includes(platform.id)}
                          onChange={() => togglePlatform(platform.id)}
                          className="bg-background checked:bg-gradient-to-r checked:from-accent checked:to-cyan-bright border-accent/30 rounded focus:ring-2 focus:ring-accent w-4 h-4 transition-all cursor-pointer"
                        />
                        <label
                          htmlFor={`platform-${platform.id}`}
                          className="flex-1 text-gray-300 hover:text-accent text-sm transition-colors cursor-pointer"
                        >
                          {platform.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4 pt-12"
            >
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="flex justify-center items-center bg-gradient-to-br from-accent/20 hover:from-accent/30 to-cyan-bright/20 hover:to-cyan-bright/30 shadow-accent/30 shadow-md hover:shadow-accent/50 border border-accent/30 hover:border-accent/50 rounded-lg w-12 h-12 hover:scale-110 transition-all"
                  title="Reset Filters"
                >
                  <span className="font-bold text-accent text-lg">↺</span>
                </button>
                
                <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 to-purple-600/20 shadow-md shadow-primary/30 border border-primary/30 rounded-lg w-12 h-12" title="Genres">
                  <RiGameLine className="text-primary" size={24} />
                </div>
                
                <div className="flex justify-center items-center bg-gradient-to-br from-accent/20 to-cyan-bright/20 shadow-accent/30 shadow-md border border-accent/30 rounded-lg w-12 h-12" title="Platforms">
                  <RiGamepadLine className="text-accent" size={24} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social media */}
      <AnimatePresence mode="wait">
        {!isCollapsed ? (
          <motion.div
            key="social-expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sidebar-social-media"
          >
            <a
              href="https://twitter.com/?lang=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-primary hover:scale-110 transition-all"
            >
              <RiTwitterLine />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-neon hover:scale-110 transition-all"
            >
              <RiInstagramLine />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-accent hover:scale-110 transition-all"
            >
              <RiYoutubeLine />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary hover:scale-110 transition-all"
            >
              <RiFacebookFill />
            </a>
          </motion.div>
        ) : (
          <motion.div
            key="social-collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-3 pt-4"
          >
            <a
              href="https://twitter.com/?lang=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="flex justify-center items-center bg-gradient-to-br from-primary/10 hover:from-primary/20 to-purple-600/10 hover:to-purple-600/20 shadow-sm hover:shadow-md hover:shadow-primary/30 border border-primary/20 hover:border-primary/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
            >
              <RiTwitterLine className="text-primary" size={18} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex justify-center items-center bg-gradient-to-br from-neon/10 hover:from-neon/20 to-pink-500/10 hover:to-pink-500/20 shadow-sm hover:shadow-md hover:shadow-neon/30 border border-neon/20 hover:border-neon/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
            >
              <RiInstagramLine className="text-neon" size={18} />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex justify-center items-center bg-gradient-to-br from-accent/10 hover:from-accent/20 to-cyan-bright/10 hover:to-cyan-bright/20 shadow-sm hover:shadow-accent/30 hover:shadow-md border border-accent/20 hover:border-accent/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
            >
              <RiYoutubeLine className="text-accent" size={18} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex justify-center items-center bg-gradient-to-br from-primary/10 hover:from-primary/20 to-purple-500/10 hover:to-purple-500/20 shadow-sm hover:shadow-md hover:shadow-primary/30 border border-primary/20 hover:border-primary/40 rounded-lg w-10 h-10 hover:scale-110 transition-all"
            >
              <RiFacebookFill className="text-primary" size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
