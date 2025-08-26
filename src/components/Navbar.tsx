import { NavLink } from "react-router-dom";
import { useCart } from "../app/cart/useCart"; // path from components → app

export default function Navbar() {
  const { cart } = useCart();                       
  const count = cart.reduce((n, item) => n + item.qty, 0);

  return (
    <nav className="h-14 border-b flex items-center px-4 gap-4">
      <NavLink to="/" className="font-bold">Crit & Counter</NavLink>
      <div className="ml-auto flex items-center gap-4 text-sm">
        <NavLink to="/" className="hover:underline">Shop</NavLink>
        <NavLink to="/cart" className="relative hover:underline">
          Cart
          {count > 0 && (
            <span className="ml-1 inline-flex items-center justify-center text-xs min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white">
              {count}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
