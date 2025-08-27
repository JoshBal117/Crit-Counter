import { useCart } from "../cart/useCart";

const money = (c:number) => `$${(c/100).toFixed(2)}`;
const sum = (xs:number[]) => xs.reduce((a,b) => a+b, 0);

export default function Cart() {
    const { cart, addToCart, decrement, removeFromCart, clearCart } = useCart();


    if (cart.length === 0) {
        return <p style= {{ padding: 16 }}>Your cart is empty.</p>;
    }

        const subtotal = sum(cart.map(i => i.price * i.qty));
        const shipping = subtotal > 5000 ? 0:499; // free shipping over $50 otherwise $4.99
        const tax = Math.round( subtotal * 0.07); // 7% sales tax
        const total = subtotal + shipping + tax;


    return (
        <div style={{ padding: 16 }}>
            <h1>Your Cart</h1>
            {cart.map(item => (
                <div 
                key={item.id} 
                style={{ 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", 
                    gap: 12, 
                    marginBottom:12
                    }}
                >
                    <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: 60, height: 60, objectFit: "cover", }}
                    />
                    
                    <div style={{ flex: 1}}>
                        <strong>{item.name}</strong>
                        <p>
                            {money(item.price)} x {item.qty}
                        </p>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>

                    <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <button
                        onClick={() => decrement(item.id)}
                        aria-label="decrease"
                        style={{
                            width: 32, 
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", 
                            borderRadius: 6,
                            border: "1px solid #ddd",
                            background: "#f3f4f6",
                            fontSize:18,
                        }}
                        >
                            -
                        </button>
                        <span style={{ minWidth: 24, textAlign: "center"}}>{item.qty}</span>
                        <button 
                        onClick={() => 
                            addToCart({id: item.id, name: item.name, price: item.price, image: item.image})
                        }
                        aria-label="increase"
                        style={{
                            width: 32, 
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", 
                            borderRadius: 6,
                            border: "1px solid #ddd",
                            background: "#f3f4f6",
                            fontSize:18,
                        }}
                        >
                            +
                        </button>
                    </div>
                </div>  
                ))}


                {/* Totals Block Section*/}
                <div style={{ marginTop: 16}}>
                    <p>Subtotal: {money(subtotal)}</p>
                    <p>Shipping: {shipping === 0 ? "free" : money(shipping)}</p>
                    <p>Tax: {money(tax)}</p>
                    <h2>Total: {money(total)}</h2>
                </div>

                <button onClick={clearCart} style={{marginTop: 12}}>
                    Clear Cart
                </button>
                </div>
    )
}