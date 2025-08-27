import {useState} from "react";
import type { ReactNode } from "react";
import { CartContext, type CartItem } from "./CartContext";


export default function CartProvider({ children }: { children: ReactNode }) {
          const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item: Omit<CartItem, "qty">) {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      return existing
        ? prev.map(p => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
        : [...prev, { ...item, qty: 1 }];
    });
  }
    function decrement(id:string) {
      setCart(prev => {
        const found = prev.find(p => p.id === id);
        if (!found) return prev;
        if (found.qty === 1) {
          return prev.filter(p => p.id !== id);
        }
        return prev.map(p => (p.id === id ? { ...p, qty: p.qty - 1} : p));
      })
    }


    const removeFromCart = (id: string) => setCart(prev => prev.filter(p => p.id !== id));
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decrement }}>
            {children}
        </CartContext.Provider>
    );

}

