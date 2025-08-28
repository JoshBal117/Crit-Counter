
import { useLocation, useParams, Link } from "react-router-dom";
import { useCart } from "../cart/useCart";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    tags?: string[];
};


export default function Product() {
    const { id} = useParams();
    const { addToCart } = useCart();
    const location = useLocation() as { state?: { product?: Product} };
    const product = location.state?.product;
    
    
    if (!product) {
    return (
        <div className="p-4 mwx-w-3xl-mx-auoto">
            <h1 className="text-xl font semihold">Product</h1>
            <p><Link to="/" className="text-sky-600">Back to Shop</Link></p>
        </div>
    );
}


const money = (c: number) => `$${(c / 100).toFixed(2)}`;



function handleAddToCart() {
    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
    });
}

    return (
        <div className="p-4 max-w-5xl mx-auto">
      <Link to="/" className="inline-block py-2 text-sky-600">← Back to shop</Link>


           <div className="grid gap-4 md:grid-cols-2">
        {/* Image box: square on mobile, 4/3 on md+ */}
        <div className="w-full bg-gray-100 rounded-xl overflow-hidden aspect-square md:aspect-[4/3]">
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
                <div>
                    <h1 className="text-2xl font-semibold leading-tight">{product.name}</h1>
                    <div className="mt-2 text-lg font-bold">{money(product.price)}</div>

                    {!!product.tags?.length && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {product.tags.map(t => (
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