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
            className="z-40 fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="top-0 right-0 z-50 fixed flex flex-col bg-background shadow-2xl w-full sm:w-96 h-full"
          >
            <div className="flex justify-between items-center p-6 border-gray-700 border-b">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-primary" size={24} />
                <h2 className="font-bold text-white text-xl">
                  Shopping Cart ({itemCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-gray-700 p-2 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <FiX className="text-white" size={24} />
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

                <div className="space-y-4 p-6 border-gray-700 border-t">
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

                  <div className="flex justify-between items-center pt-4 border-gray-700 border-t text-lg">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-primary">
                      ${(total * 1.1).toFixed(2)}
                    </span>
                  </div>

                  <button className="bg-primary hover:bg-primary/90 py-3 rounded-lg w-full font-bold text-white transition-colors">
                    Checkout
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="hover:bg-red-500/10 py-2 rounded-lg w-full font-semibold text-red-500 text-sm transition-colors"
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
