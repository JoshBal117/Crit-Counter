import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import CartProvider from './app/cart/CartProvider.tsx';
import router from './app/router.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
       <RouterProvider router={router} />
    </CartProvider>
   
  </React.StrictMode>
);
