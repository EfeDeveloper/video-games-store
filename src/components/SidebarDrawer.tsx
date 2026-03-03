import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import {
  RiMoneyDollarCircleLine,
  RiTwitterLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiFacebookFill,
} from 'react-icons/ri';
import { categories } from '@/common/constants/categories';
import { platforms } from '@/common/constants/platforms';
import { useFilterStore } from '@/store/useFilterStore';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarDrawer = ({ isOpen, onClose }: SidebarDrawerProps) => {
  const {
    selectedCategories,
    selectedPlatforms,
    priceRange,
    toggleCategory,
    togglePlatform,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
            className="lg:hidden z-40 fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden top-0 left-0 z-50 fixed flex flex-col bg-background shadow-2xl w-full sm:w-80 h-full overflow-y-auto"
          >
            <div className="top-0 z-10 sticky flex justify-between items-center bg-background p-6 border-gray-700 border-b">
              <h2 className="font-bold text-white text-xl">Filters</h2>
              <button
                onClick={onClose}
                className="hover:bg-gray-700 p-2 rounded-lg transition-colors"
                aria-label="Close filters"
              >
                <FiX className="text-white" size={24} />
              </button>
            </div>

            <div className="flex-1 p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold text-white text-lg">
                  Active Filters
                </h4>
                <button
                  onClick={handleReset}
                  className="text-primary hover:text-primary/80 text-sm transition-colors"
                >
                  Reset All
                </button>
              </div>

              <h5 className="mb-3 font-semibold text-md text-white">
                Categories
              </h5>
              <div className="flex flex-col gap-2 mb-6">
                {categories.map((category) => (
                  <div className="flex items-center gap-2" key={category.id}>
                    <input
                      type="checkbox"
                      id={`drawer-category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={`drawer-category-${category.id}`}
                      className="text-gray-300 text-sm cursor-pointer"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>

              <h5 className="mb-3 font-semibold text-md text-white">
                Platforms
              </h5>
              <div className="flex flex-col gap-2 mb-6">
                {platforms.map((platform) => (
                  <div className="flex items-center gap-2" key={platform.id}>
                    <input
                      type="checkbox"
                      id={`drawer-platform-${platform.id}`}
                      checked={selectedPlatforms.includes(platform.id)}
                      onChange={() => togglePlatform(platform.id)}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={`drawer-platform-${platform.id}`}
                      className="text-gray-300 text-sm cursor-pointer"
                    >
                      {platform.label}
                    </label>
                  </div>
                ))}
              </div>

              <h5 className="mb-3 font-semibold text-md text-white">
                Price Range
              </h5>
              <form
                onSubmit={handlePriceSubmit}
                className="flex flex-col gap-4 mb-6"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="relative flex-1">
                    <RiMoneyDollarCircleLine className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange(Number(e.target.value), priceRange.max)
                      }
                      className="bg-[#27272A] p-2 pr-4 pl-8 rounded-lg outline-none w-full text-white text-sm"
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative flex-1">
                    <RiMoneyDollarCircleLine className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange(priceRange.min, Number(e.target.value))
                      }
                      className="bg-[#27272A] p-2 pr-4 pl-8 rounded-lg outline-none w-full text-white text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center px-1 text-gray-400 text-xs">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </form>
            </div>

            <div className="bottom-0 sticky bg-background p-6 border-gray-700 border-t">
              <h3 className="mb-4 font-semibold text-gray-400 text-sm uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/?lang=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
                  aria-label="Twitter"
                >
                  <RiTwitterLine className="text-white" size={20} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
                  aria-label="Instagram"
                >
                  <RiInstagramLine className="text-white" size={20} />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
                  aria-label="YouTube"
                >
                  <RiYoutubeLine className="text-white" size={20} />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
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
