import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";

const money = (c: number) => `$${(c / 100).toFixed(2)}`;
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export default function Cart() {
  const { cart, addToCart, decrement, removeFromCart, clearCart } = useCart();

 if (cart.length === 0) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">Your Cart</h1>
        <div className="grid place-items-center h-40 rounded-xl border">
          <p className="text-gray-700">Your cart is empty.</p>
        </div>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold"
        >
          Continue shopping
        </Link>
      </div>
  );
}

  const subtotal = sum(cart.map((i) => i.price * i.qty));
  const shipping = subtotal > 5000 ? 0 : 499; // free over $50
  const tax = Math.round((subtotal + shipping) * 0.07); // 7% on sub+ship   // 7% on sub+ship
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Your Cart</h1>

      <div className="grid gap-6 md:grid-cols-4">
        {/* LEFT: items */}
        <div className="md:col-span-3 space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 border rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    {money(item.price)} × {item.qty}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-1 text-xs text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* qty controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrement(item.id)}
                  aria-label="decrease quantity"
                  className="w-9 h-9 flex items-center justify-center border border-gray-300 bg-gray-100 rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span className="min-w-[24px] text-center">{item.qty}</span>
                <button
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  aria-label="increase quantity"
                  className="w-9 h-9 flex items-center justify-center border border-gray-300 bg-gray-100 rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: order summary */}
        <aside className="md:col-span-1 border rounded-xl p-4 h-fit md:sticky md:top-16">
          <div className="text-lg font-semibold mb-2">Order Summary</div>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "free" : money(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{money(tax)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2 mt-2 border-t">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
                     <div className="mt-3 flex gap-2">
              <button onClick={clearCart} className="px-3 py-2 rounded bg-gray-200 text-sm">
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="px-3 py-2 rounded bg-rose-600 text-white text-sm"
              >
                Checkout
              </Link>
            </div>
          </aside>
      </div>
    </div>
  );
}
