import { Outlet, NavLink} from "react-router-dom";

function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="h-14 border-b flex items center px-4">
        <strong>Crit & Counter</strong>
        <nav className="ml-auto text-sm">
          <NavLink to="/" className="px-2">Shop</NavLink>
          <NavLink to="/cart" className="px-2">Cart</NavLink>
        </nav>
    </header>
   

    <main className="flex-1 px-4 py-3">
      <Outlet />
    </main>

    <footer className="h-12 border-grid place-items-center text-xs">
      © 2023 Crit & Counter
    </footer>
     </div>
  );
}
export default App