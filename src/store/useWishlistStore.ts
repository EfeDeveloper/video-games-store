import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Game } from '@/types';

interface WishlistStore {
  items: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: number) => void;
  isInWishlist: (gameId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (game) => {
        const items = get().items;
        const exists = items.some((item) => item.id === game.id);

        if (!exists) {
          set({ items: [...items, game] });
        }
      },

      removeFromWishlist: (gameId) => {
        set({
          items: get().items.filter((item) => item.id !== gameId),
        });
      },

      isInWishlist: (gameId) => {
        return get().items.some((item) => item.id === gameId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
