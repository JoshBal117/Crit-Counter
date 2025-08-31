import {Link, useLocation, useParams} from "react-router-dom";

type State = {
    orderId?: string;
    tracking?: string;
    email?: string;
    total?: number;
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

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border p-3">
            <div className="font-semibold mb-1">Receipt</div>
            <div>Total Paid: {money(s.total ?? 0)}</div>
            <div>Sent to: {s.email ?? "—"}</div>
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

        
