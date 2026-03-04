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
      <header className="z-10 relative flex justify-between items-center bg-gradient-to-r from-[#0a0118] via-[#1a0b2e] to-[#0a0118] shadow-[0_4px_24px_rgba(139,92,246,0.15)] backdrop-blur-sm px-4 sm:px-6 md:px-10 py-4 border-primary/20 border-b h-[10vh] overflow-hidden text-secondary">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-30 animate-pulse-glow" />
        
        <div className="z-10 relative flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden header-hover"
            aria-label="Open menu"
          >
            <RiMenu3Line size={24} />
          </button>

          {/* Logo with neon effect */}
          <div className="flex flex-col leading-tight">
            <h1 className="bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-bright font-black text-transparent text-2xl sm:text-3xl md:text-4xl tracking-wider">
              EDFER
            </h1>
            <span className="ml-0.5 font-light text-[10px] text-accent/80 sm:text-xs tracking-[0.3em]">
              Video Games
            </span>
          </div>
        </div>

        {/* User menu */}
        <ul className="flex items-center gap-4 sm:gap-6 text-2xl">
          <li className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative header-hover"
              aria-label="Shopping cart"
            >
              <RiShoppingCartLine />
              {cartItemCount > 0 && (
                <span className="-top-2 -right-2 absolute flex justify-center items-center bg-gradient-to-r from-accent to-cyan-bright shadow-glow-cyan rounded-full w-5 h-5 font-bold text-white text-xs animate-pulse-glow">
                  {cartItemCount}
                </span>
              )}
            </button>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="group relative header-hover"
              aria-label="Wishlist"
            >
              <RiHeart2Line />
              {wishlistCount > 0 && (
                <span className="-top-2 -right-2 absolute flex justify-center items-center bg-gradient-to-r from-neon to-pink-600 shadow-glow-pink rounded-full w-5 h-5 font-bold text-white text-xs animate-pulse-glow">
                  {wishlistCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              className="flex justify-center items-center bg-gradient-to-br from-primary hover:from-primary to-purple-700 hover:to-neon shadow-glow-purple hover:shadow-glow-multi rounded-full ring-2 ring-accent w-8 h-8 transition-all duration-300"
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
