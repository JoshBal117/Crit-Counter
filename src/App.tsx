import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header handled entirely by <Navbar /> */}
      <Navbar />

      {/* Center every page */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="h-12 border-t grid place-items-center text-xs">
        © {new Date().getFullYear()} Crit & Counter
      </footer>
    </div>
  );
}
