import { useCart } from "../cart/useCart";




export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();

    if (cart.length === 0) {
        return <p style= {{ padding: 16 }}>Your cart is empty.</p>;
    }

    return (
        <div style={{ padding: 16 }}>
            <h1>Your Cart</h1>
            {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, marginBottom:12}}>
                    <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", }}/>
                    <div>
                        <strong>{item.name}</strong>
                        <p>${(item.price/100).toFixed(2)} x {item.qty}</p>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                </div>  
                ))}
                <button onClick={clearCart} style={{marginTop: 12}}>
                    Clear Cart
                </button>
                </div>
    )
}