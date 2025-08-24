import {useParams} from "react-router-dom";
import { useLocation, usePArams, Link } from "react-router-dom";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    tags?: string[];
};


export default function Product() {
    const { id} = useParams();
    const location = useLocation() as { state?: { product?: Product} };
    const product = location.state?.product;
    
    
    if (!product) {
    return (
        <div style={{ padding:16 }}>
            <h1>Product</h1>
            <p>We don't have data for <code>{id}</code></p>
            <p><Link to="/">Back to shop</Link></p>
        </div>
    );
}


const money = (c: number) => `$${(c / 100).toFixed(2)}`;

function handleAddToCart() {

    alert('Added 1 x ${product.name} to cart (mock)');
}

    return (
        <div style={{ padding: 16}}>
            <Link to ="/" style ={{textDecoration: "none" }}>← Back to shop</Link>
            <div style={{ display : "grid", gap: 16, gridTemplateColumns: "1fr"}}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 12 }}
                />
                <div>
                    <h1 style={{ margin: 0 }}>{product.name}</h1>
                    <div style={{ marginTop: 8, fontWeight: 700}}>{money(product.price)}</div>
                </div>
        </div>
    )