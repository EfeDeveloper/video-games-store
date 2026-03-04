import { memo, useCallback } from 'react';
import { CartItem as CartItemType } from '@/types';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = memo(({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleIncrease = useCallback(() => {
    updateQuantity(item.game.id, item.quantity + 1);
  }, [item.game.id, item.quantity, updateQuantity]);

  const handleDecrease = useCallback(() => {
    if (item.quantity > 1) {
      updateQuantity(item.game.id, item.quantity - 1);
    }
  }, [item.game.id, item.quantity, updateQuantity]);

  const handleRemove = useCallback(() => {
    removeFromCart(item.game.id);
    toast.error(`${item.game.name} removed from cart`);
  }, [item.game.id, item.game.name, removeFromCart]);

  return (
    <div className="group relative flex gap-4 bg-gradient-to-br from-purple-900/40 to-background shadow-lg hover:shadow-glow-purple p-4 border border-primary/20 hover:border-primary/40 rounded-lg overflow-hidden transition-all duration-300">
      <div className="relative flex-shrink-0 rounded-lg w-24 h-24 overflow-hidden">
        <img
          src={item.game.background_image || '/placeholder-game.jpg'}
          alt={item.game.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="mb-1 font-semibold text-white line-clamp-1">
          {item.game.name}
        </h4>
        <p className="bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-3 font-bold text-transparent text-lg">${item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="bg-gradient-to-br from-primary/20 hover:from-primary/30 to-purple-600/20 hover:to-purple-600/30 hover:shadow-glow-purple p-1.5 border border-primary/30 hover:border-primary/50 rounded transition-all"
            aria-label="Decrease quantity"
          >
            <FiMinus size={14} className="text-primary" />
          </button>

          <span className="bg-gradient-to-r from-primary/10 to-purple-600/10 px-3 py-1 rounded w-auto min-w-[2rem] font-bold text-primary text-sm text-center">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="bg-gradient-to-br from-primary/20 hover:from-primary/30 to-purple-600/20 hover:to-purple-600/30 hover:shadow-glow-purple p-1.5 border border-primary/30 hover:border-primary/50 rounded transition-all"
            aria-label="Increase quantity"
          >
            <FiPlus size={14} className="text-primary" />
          </button>

          <button
            onClick={handleRemove}
            className="hover:bg-red-500/20 hover:shadow-glow-pink ml-auto p-2 rounded text-red-400 hover:text-red-300 transition-all"
            aria-label="Remove from cart"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});
