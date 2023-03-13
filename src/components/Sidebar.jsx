import {
  RiMoneyDollarCircleLine,
  RiTwitterLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiFacebookFill,
} from 'react-icons/ri';
import { categories } from '../common/constants/categories';
import { platforms } from '../common/constants/platforms';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Filter */}
      <div className="sidebar-filter">
        <h4 className="mb-4 font-semibold text-lg">Categories</h4>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <div className="flex items-center gap-2" key={category.id}>
              <input type="checkbox" className="" />
              <label htmlFor={category.label}>{category.label}</label>
            </div>
          ))}
        </div>
        <h4 className="my-4 font-semibold text-lg">Platforms</h4>
        <div className="flex flex-col gap-2">
          {platforms.map((category) => (
            <div className="flex items-center gap-4" key={category.id}>
              <input type="checkbox" value={category.id} />
              <label htmlFor={category.label}>{category.label}</label>
            </div>
          ))}
        </div>
        <h4 className="my-4 font-semibold text-lg">Price</h4>
        <form className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative">
              <RiMoneyDollarCircleLine className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                className="bg-background p-2 py2 pl-8 pr-4 rounded-lg outline-none w-full"
              />
            </div>
            <span>-</span>
            <div className="relative">
              <RiMoneyDollarCircleLine className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                className="bg-background p-2 py2 pl-8 pr-4 rounded-lg outline-none w-full"
              />
            </div>
          </div>
          <button type="submit" className="main-button">
            Apply Filters
          </button>
        </form>
      </div>
      {/* Social media */}
      <div className="sidebar-social-media">
        <a href="https://twitter.com/?lang=es">
          <RiTwitterLine />
        </a>
        <a href="https://www.instagram.com/">
          <RiInstagramLine />
        </a>
        <a href="https://www.youtube.com/?gl=CO&hl=es-419">
          <RiYoutubeLine />
        </a>
        <a href="https://es-la.facebook.com/">
          <RiFacebookFill />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
