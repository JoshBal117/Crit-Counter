import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Product from "./screens/Product";
import Checkout from "./screens/Checkout";
import OderConfirmation from "./screens/OderConfirmation";

const router = createBrowserRouter([
  { element: <App />,
    children: [
    {index: true, element: <Home />},
    {path: "product/:id", element: <Product />},
    {path: "/cart", element: <Cart />},
    {path: "checkout", element: <Checkout />},
    {path: "oder/:oderId/confirmation", element: <OderConfirmation />},

  ],
  },
]);


export default router;