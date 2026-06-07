import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: number, variationId?: number) => void;
  updateQuantity: (id: number, quantity: number, variationId?: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const key = item.variationId ?? item.id;
          const existing = state.items.find(
            (i) => (i.variationId ?? i.id) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                (i.variationId ?? i.id) === key
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id, variationId) =>
        set((state) => ({
          items: state.items.filter((i) =>
            variationId
              ? i.variationId !== variationId
              : i.id !== id
          ),
        })),
      updateQuantity: (id, quantity, variationId) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) =>
                  variationId
                    ? i.variationId !== variationId
                    : i.id !== id
                )
              : state.items.map((i) =>
                  (variationId
                    ? i.variationId === variationId
                    : i.id === id)
                    ? { ...i, quantity }
                    : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "homepicks-cart" }
  )
);
