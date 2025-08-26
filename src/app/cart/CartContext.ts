import {createContext} from "react";
import type { ReactNode } from "react";

export type CartItem = {
    id: string;
    name: string;
    price: number; // in cents
    image: string;
    qty: number;


};

export type CartContextType= {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "qty">) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};


export const CartContext = createContext<CartContextType | undefined>(undefined);
export type {ReactNode};