import { Link, useLocation, useParams } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { getProductById, type Product as ProductType } from "../data/Product";

const money = (c: number) => `$${(c / 100).toFixed(2)}`;

export default function Product() {
  // If your route is /product/:id, help TS know id is a string
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  // Don't over-type useLocation; just read optional state safely
  const loc = useLocation() as { state?: { product?: ProductType } };
  const maybeProduct = loc.state?.product ?? getProductById(id);

  // Guard early
  if (!maybeProduct) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold">Product</h1>
        <p className="mt-1">We don’t have data for <code>{id}</code>.</p>
        <p className="mt-3">
          <Link to="/" className="text-sky-600 hover:underline">Back to Shop</Link>
        </p>
      </div>
    );
  }

  // ✅ From here on TS knows this is NOT undefined
  const product = maybeProduct;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Link to="/" className="inline-block py-2 text-sky-600 hover:underline">← Back to shop</Link>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="w-full bg-gray-100 rounded-xl overflow-hidden aspect-square md:aspect-[4/3]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold leading-tight">{product.name}</h1>
          <div className="mt-2 text-lg font-bold">{money(product.price)}</div>

          {!!product.tags?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags!.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-200">
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            aria-label="Add product to cart"
            className="mt-4 w-full h-12 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 active:translate-y-px"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
