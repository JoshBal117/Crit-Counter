import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Product from "./screens/Product";
import Checkout from "./screens/Checkout";
import OrderConfirmation from "./screens/OrderConfirmation";
import {basePath} from "./utils/assetPath";

const router = createBrowserRouter(
  [
    { 
       element: <App />,
      children: [
        {index: true, element: <Home />},
        {path: "product/:id", element: <Product />},
        {path: "/cart", element: <Cart />},
        {path: "checkout", element: <Checkout />},
        {path: "order/:orderId/confirmation", element: <OrderConfirmation />},
      ],
    },
  ],
  {basename: basePath()

  }
);

export default router;