import { useState } from 'react';
import {
  RiShoppingCartLine,
  RiHeart2Line,
  RiUser3Line,
  RiMenu3Line,
} from 'react-icons/ri';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { MobileMenu } from './MobileMenu';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <>
      <header className="header">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden mr-4 header-hover"
          aria-label="Open menu"
        >
          <RiMenu3Line size={24} />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
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
          <li className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="header-hover"
              aria-label="Shopping cart"
            >
              <RiShoppingCartLine />
              {cartItemCount > 0 && (
                <span className="-top-2 -right-2 absolute flex justify-center items-center bg-primary rounded-full w-5 h-5 font-bold text-white text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="header-hover"
              aria-label="Wishlist"
            >
              <RiHeart2Line />
              {wishlistCount > 0 && (
                <span className="-top-2 -right-2 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 font-bold text-white text-xs">
                  {wishlistCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              className="flex justify-center items-center bg-gray-700 hover:bg-gray-600 rounded-full ring-2 ring-primary w-8 h-8 transition-colors"
              aria-label="User menu"
            >
              <RiUser3Line className="text-white" size={20} />
            </button>
          </li>
        </ul>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
