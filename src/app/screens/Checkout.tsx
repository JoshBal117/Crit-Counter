import {useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/useCart";
import {Link} from "react-router-dom";

const money = (c: number) => `$${(c / 100).toFixed(2)}`;

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // --- totals (memo so they update when cart changes)
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const ship = sub > 5000 ? 0 : 499;
    const tx = Math.round((sub + ship) * 0.07);
    return { subtotal: sub, shipping: ship, tax: tx, total: sub + ship + tx };
  }, [cart]);

  // --- minimal form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProv, setStateProv] = useState("");
  const [zip, setZip] = useState("");

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">Checkout</h1>
        <div className="rounded-xl border p-6">
          <p>Your cart is empty.</p>
          <a href="/" className="inline-block mt-3 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold">
            Continue shopping
          </a>
        </div>
      </div>
    );
  }

  // Mock generators
  function genOrderId() {
    return "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  }
  function genUpsTracking() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let body = "";
    for (let i = 0; i < 16; i++) body += chars[(Math.random() * chars.length) | 0];
    return `1Z${body}`;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // simple validation
    if (!name || !email || !address || !city || !stateProv || !zip) {
      alert("Please complete all shipping fields.");
      return;
    }

    const orderId = genOrderId();
    const tracking = genUpsTracking();

    // In real app, submit to backend here...
    clearCart();
    navigate(`/order/${orderId}/confirmation`, {
        replace: true, 
        state: {
            orderId,
            tracking,
            email,
            total, 
            shipTo: {name, address, city, stateProv, zip},
        },
    }); 
}

    return(
        <div className="space-y-4">
            <h1 className="text2xl md:text-3xl font-semibold">Checkout</h1>
            {/* grid: form left, summary right (stacks on mobile) */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-3">
          <section className="rounded-xl border p-4">
            <h2 className="font-semibold mb-3">Shipping Information</h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm">Full name</span>
                <input
                  value={name} onChange={e => setName(e.target.value)} required
                  className="mt-1 w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm">Email</span>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="mt-1 w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm">Address</span>
                <input
                  value={address} onChange={e => setAddress(e.target.value)} required
                  className="mt-1 w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>

              <label className="block">
                <span className="text-sm">City</span>
                <input
                  value={city} onChange={e => setCity(e.target.value)} required
                  className="mt-1 w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>

              <label className="block">
                <span className="text-sm">State/Province</span>
                <input
                  value={stateProv} onChange={e => setStateProv(e.target.value)} required
                  className="mt-1 w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>

              <label className="block">
                <span className="text-sm">ZIP/Postal</span>
                <input
                  value={zip} onChange={e => setZip(e.target.value)} required
                  className="mt-1 w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>
            </div>
          </section>

          {/* Mock payment (optional) */}
          <section className="rounded-xl border p-4">
            <h2 className="font-semibold mb-3">Payment (Mock)</h2>
            <p className="text-sm text-gray-600">
              This is a demo—no real payment is processed. Click <em>Place Order</em> to complete.
            </p>
          </section>

          <div className="flex gap-2">
                        <Link to="/cart" className="px-4 py-3 rounded-lg bg-gray-200 text-sm">
                            Back to Cart
                        </Link>
                    <button
              type="submit"
              className="px-4 py-3 rounded-lg bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700">
                         Place Order
                    </button>
          </div>
        </form>

        {/* SUMMARY */}
        <aside className="border rounded-xl p-4 h-fit md:sticky md:top-16">
          <div className="text-lg font-semibold mb-2">Order Summary</div>
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "free" : money(shipping)}</span></div>
          <div className="flex justify-between text-sm"><span>Tax</span><span>{money(tax)}</span></div>
          <div className="flex justify-between font-semibold text-base pt-2 mt-2 border-t">
            <span>Total</span><span>{money(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
