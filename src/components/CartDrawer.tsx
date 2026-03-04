import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';
import { CartItem } from './CartItem';
import { EmptyState } from './EmptyState';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const total = getTotalPrice();
  const itemCount = getTotalItems();

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="top-0 right-0 z-50 fixed flex flex-col bg-gradient-to-b from-purple-dark to-background shadow-glow-multi border-primary/30 border-l w-full sm:w-96 h-full"
          >
            <div className="flex justify-between items-center bg-gradient-to-r from-primary/20 via-purple-600/20 to-transparent backdrop-blur-sm p-6 border-primary/20 border-b">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/50 rounded-lg w-10 h-10">
                  <FiShoppingBag className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-white text-xl">
                    Shopping Cart
                  </h2>
                  <p className="text-primary text-xs">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-primary/20 hover:shadow-glow-purple p-2 rounded-lg transition-all"
                aria-label="Close cart"
              >
                <FiX className="text-primary" size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1">
                <EmptyState
                  icon={<FiShoppingBag size={64} />}
                  title="Your cart is empty"
                  description="Add some amazing games to get started with your collection!"
                />
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 p-4 overflow-y-auto">
                  {items.map((item) => (
                    <CartItem key={item.game.id} item={item} />
                  ))}
                </div>

                <div className="space-y-4 bg-gradient-to-r from-transparent via-primary/5 to-transparent backdrop-blur-sm p-6 border-primary/20 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-semibold text-white">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Tax (10%)</span>
                    <span className="font-semibold text-white">
                      ${(total * 0.1).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-primary/20 border-t text-lg">
                    <span className="font-bold text-white">Total</span>
                    <span className="bg-clip-text bg-gradient-to-r from-primary to-purple-400 font-bold text-transparent text-2xl">
                      ${(total * 1.1).toFixed(2)}
                    </span>
                  </div>

                  <button className="bg-gradient-to-r from-primary hover:from-primary/90 to-purple-600 hover:to-purple-700 shadow-lg shadow-primary/50 hover:shadow-primary/70 py-3 rounded-lg w-full font-bold text-white hover:scale-[1.02] transition-all">
                    Checkout
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="bg-gradient-to-r from-red-500/20 hover:from-red-500/30 to-pink-500/20 hover:to-pink-500/30 hover:shadow-glow-pink py-2 border border-red-500/30 hover:border-red-500/50 rounded-lg w-full font-semibold text-red-400 hover:text-red-300 text-sm transition-all"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
