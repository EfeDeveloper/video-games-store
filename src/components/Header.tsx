import { useState } from 'react';
import {
  RiShoppingCartLine,
  RiHeart2Line,
  RiUser3Line,
  RiMenu3Line,
  RiGamepadLine,
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
        <ul className="flex items-center gap-4 sm:gap-6">
          <li className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative hover:bg-accent/10 p-2 rounded-lg text-2xl transition-all"
              aria-label="Shopping cart"
            >
              <RiShoppingCartLine className="text-secondary group-hover:text-accent transition-colors" />
              {cartItemCount > 0 && (
                <span className="-top-1 -right-1 absolute flex justify-center items-center bg-gradient-to-r from-accent to-cyan-bright shadow-glow-cyan rounded-full w-5 h-5 font-bold text-white text-xs animate-pulse-glow">
                  {cartItemCount}
                </span>
              )}
            </button>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="group relative hover:bg-neon/10 p-2 rounded-lg text-2xl transition-all"
              aria-label="Wishlist"
            >
              <RiHeart2Line className="text-secondary group-hover:text-neon transition-colors" />
              {wishlistCount > 0 && (
                <span className="-top-1 -right-1 absolute flex justify-center items-center bg-gradient-to-r from-neon to-pink-600 shadow-glow-pink rounded-full w-5 h-5 font-bold text-white text-xs animate-pulse-glow">
                  {wishlistCount}
                </span>
              )}
            </button>
          </li>
          <li className="ml-2">
            <button
              className="group relative flex justify-center items-center bg-gradient-to-br from-primary hover:from-accent via-purple-600 hover:via-neon to-neon hover:to-primary shadow-lg shadow-primary/50 hover:shadow-glow-multi p-[3px] rounded-xl w-10 h-10 hover:scale-110 transition-all duration-500"
              aria-label="User menu"
            >
              {/* Animated pulse ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-neon opacity-0 group-hover:opacity-100 blur-sm rounded-xl transition-opacity animate-pulse duration-500" />
              
              {/* Inner container */}
              <div className="relative flex justify-center items-center bg-gradient-to-br from-purple-dark via-purple-900 to-background rounded-lg w-full h-full overflow-hidden">
                {/* Corner accents */}
                <div className="top-0 left-0 absolute bg-gradient-to-br from-accent to-transparent opacity-60 rounded-tl-lg w-3 h-3" />
                <div className="right-0 bottom-0 absolute bg-gradient-to-tl from-neon to-transparent opacity-60 rounded-br-lg w-3 h-3" />
                
                {/* Front icon (User) - Fades out on hover */}
                <div className="absolute inset-0 flex justify-center items-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                  <div className="relative">
                    <RiUser3Line className="z-10 relative text-white" size={20} />
                  </div>
                </div>
                
                {/* Back icon (Gamepad) - Fades in on hover */}
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon to-accent opacity-50 blur-md" />
                    <RiGamepadLine className="z-10 relative text-neon animate-pulse" size={20} />
                  </div>
                </div>
              </div>
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
