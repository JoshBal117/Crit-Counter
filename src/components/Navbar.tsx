import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav style= {{ padding : 16, background: "#222", color: "#fff"}}>
            <Link to= "/" style={{ marginRight:8, color: "#fff"}}>Home</Link>
            <Link to="/cart" style={{ marginRight:8, color: "#fff"}}>Cart</Link>
            <Link to="/checkout" style={{ color: "#fff"}}>Checkout</Link>
        </nav>
    );
}