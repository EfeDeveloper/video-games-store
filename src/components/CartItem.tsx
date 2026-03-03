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
    <div className="flex gap-4 bg-[#27272A] p-4 rounded-lg">
      <img
        src={item.game.background_image || '/placeholder-game.jpg'}
        alt={item.game.name}
        className="rounded w-24 h-24 object-cover"
      />

      <div className="flex-1 min-w-0">
        <h4 className="mb-1 font-semibold text-white truncate">
          {item.game.name}
        </h4>
        <p className="mb-3 font-bold text-primary">${item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="bg-gray-700 hover:bg-gray-600 p-1 rounded transition-colors"
            aria-label="Decrease quantity"
          >
            <FiMinus size={16} className="text-white" />
          </button>

          <span className="w-8 font-semibold text-white text-center">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="bg-gray-700 hover:bg-gray-600 p-1 rounded transition-colors"
            aria-label="Increase quantity"
          >
            <FiPlus size={16} className="text-white" />
          </button>

          <button
            onClick={handleRemove}
            className="hover:bg-red-500/10 ml-auto p-2 rounded text-red-500 transition-colors"
            aria-label="Remove from cart"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});
