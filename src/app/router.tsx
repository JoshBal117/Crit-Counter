import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Product from "./screens/Product";

const router = createBrowserRouter([
  { element: <App />,
    children: [
    {index: true, element: <Home />},
    {path: "product/:id", element: <Product />},
    {path: "/cart", element: <Cart />},
  ],
  },
]);


export default router;