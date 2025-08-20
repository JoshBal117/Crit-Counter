import {useParams} from "react-router-dom";


export default function Product() {
    const { id} = useParams();
    return (
        <div style ={{ padding: 16 }}>
            <h1>Product</h1>
            <p>ID: {id}</p>
            <p>(Next: load real data and add "Add to cart".)</p>

        </div>
    );
}