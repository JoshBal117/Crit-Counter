import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import {products} from  "../data/Product";




export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} state={{ product: p }} className="block">
            <ProductCard name={p.name} price={p.price} image={p.image} tags={p.tags} />
          </Link>
        ))}
      </div>
    </div>
  );
}
