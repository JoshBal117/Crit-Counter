import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./screens/Home";
import Cart from "./screens/Cart";

const router = createBrowserRouter([
  { element: <App />,
    children: [
    {index: true, element: <Home />},
    {path: "/cart", element: <Cart />},
  ]}
]);


export default router;