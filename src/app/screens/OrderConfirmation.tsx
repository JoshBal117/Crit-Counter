import {Link, useLocation, useParams} from "react-router-dom";

type State = {
    orderId?: string;
    tracking?: string;
    email?: string;
    subtotal?: number;
    shipping?: number;
    tax?: number;
    total?: number;
    items?: { id: string; name: string; image: string; price: number; qty: number }[];
    shipTo?: {
        name: string;
        address: string;
        city: string;
        stateProv: string;
        zip: string};
    };

    const money = (c:number) => `$${(c/100).toFixed(2)}`;

    export default function OrderConfirmation() {
        const {orderId} = useParams();
        const location = useLocation() as {state?: State };
        const s = location.state || {};

        return (
            <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Thank you!</h1>

      <div className="rounded-xl border p-4">
        <div className="text-sm text-gray-700">
          Your order <strong>{s.orderId ?? orderId}</strong> has been placed.
        </div>

            {!!s.items?.length && (
          <div className="space-y-2">
            {s.items.map(it => (
              <div key={it.id} className="flex items-center gap-3">
                <img
                  src={it.image}
                  alt={it.name}
                  className="w-12 h-12 object-cover rounded"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder.jpg"; }}
                />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-600">
                    {money(it.price)} × {it.qty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

         <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border p-3">
            <div className="font-semibold mb-1">Receipt</div>
            {!!(s.subtotal !== undefined) && (
              <>
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(s.subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span>Shipping</span><span>{s.shipping ? money(s.shipping) : "free"}</span></div>
                <div className="flex justify-between text-sm"><span>Tax</span><span>{money(s.tax ?? 0)}</span></div>
              </>
            )}
            <div className="flex justify-between font-semibold pt-2 mt-2 border-t">
              <span>Total Paid</span><span>{money(s.total ?? 0)}</span>
            </div>
            <div className="mt-1 text-sm text-gray-700">Sent to: {s.email ?? "—"}</div>
          </div>

          <div className="rounded-lg border p-3">
            <div className="font-semibold mb-1">Shipping</div>
            <div>UPS Tracking: <strong>{s.tracking ?? "Pending"}</strong></div>
            {s.shipTo && (
              <div className="mt-1 text-sm text-gray-700">
                {s.shipTo.name}<br />
                {s.shipTo.address}<br />
                {s.shipTo.city}, {s.shipTo.stateProv} {s.shipTo.zip}
              </div>
            )}
          </div>
        </div>
      </div>

      <Link to="/" className="inline-block px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold">
        Continue shopping
      </Link>
    </div>
  );
}

        
