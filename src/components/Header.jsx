import { RiShoppingCartLine, RiHeart2Line } from 'react-icons/ri';

const Header = () => {
  return (
    <header className="text-secondary py-4 px-10 flex items-center justify-between">
      {/* Menu */}
      <ul className="flex items-center gap-6">
        <li>
          <a href="#" className="header-hover">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="header-hover">
            Streams
          </a>
        </li>
        <li>
          <a href="#" className="header-hover">
            Game store
          </a>
        </li>
        <li>
          <a href="#" className="header-hover">
            News
          </a>
        </li>
      </ul>
      {/* User menu */}
      <ul className="flex items-center gap-6 text-2xl">
        <li>
          <button className="header-hover">
            <RiShoppingCartLine />
          </button>
        </li>
        <li>
          <button className="header-hover">
            <RiHeart2Line />
          </button>
        </li>
        <li>
          <button>
            <img
              src="https://www.fakepersongenerator.com/Face/male/male20141083548990631.jpg"
              alt="fakeUser"
              className="w-8 h-8 object-cover rounded-full ring-2 ring-primary"
            />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
