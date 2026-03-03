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

const Sidebar = () => {
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

  return (
    <div className="hidden lg:block sidebar">
      {/* Filter */}
      <div className="sidebar-filter">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-lg">Filters</h4>
          <button
            onClick={resetFilters}
            className="text-primary hover:text-primary/80 text-sm transition-colors"
          >
            Reset
          </button>
        </div>

        <h5 className="mb-3 font-semibold text-md">Categories</h5>
        <div className="flex flex-col gap-2 mb-6">
          {categories.map((category) => (
            <div className="flex items-center gap-2" key={category.id}>
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="cursor-pointer"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm cursor-pointer"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>

        <h5 className="mb-3 font-semibold text-md">Platforms</h5>
        <div className="flex flex-col gap-2 mb-6">
          {platforms.map((platform) => (
            <div className="flex items-center gap-2" key={platform.id}>
              <input
                type="checkbox"
                id={`platform-${platform.id}`}
                checked={selectedPlatforms.includes(platform.id)}
                onChange={() => togglePlatform(platform.id)}
                className="cursor-pointer"
              />
              <label
                htmlFor={`platform-${platform.id}`}
                className="text-sm cursor-pointer"
              >
                {platform.label}
              </label>
            </div>
          ))}
        </div>

        <h5 className="mb-3 font-semibold text-md">Price Range</h5>
        <form onSubmit={handlePriceSubmit} className="flex flex-col gap-4">
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
                className="bg-background p-2 pr-4 pl-8 rounded-lg outline-none w-full text-sm"
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
                className="bg-background p-2 pr-4 pl-8 rounded-lg outline-none w-full text-sm"
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

      {/* Social media */}
      <div className="sidebar-social-media">
        <a
          href="https://twitter.com/?lang=es"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <RiTwitterLine />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <RiInstagramLine />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <RiYoutubeLine />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <RiFacebookFill />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
