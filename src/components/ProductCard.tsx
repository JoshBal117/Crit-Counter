type Props = {
    name: string;
    price: number;
    image: string;
    tags?: string[];

};  


export default function ProductCard({ name, price, image, tags }: Props) {
    return (
        <div style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
            <img src={image} alt={name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
            <div style={{ padding: 8 }}>
                <div style={{ fontSize: 14, lineHeight: 1.3 }}>{name}</div>
                <div style={{ marginTop: 4, fontWeight: 600 }}>{`${(price/100).toFixed(2)}`}</div>
                {!!tags?.length &&(
                    <div style={{ marginTop: 6, display: "flex", gap:6, flexWrap: "wrap"}}>
                        {tags.slice(0,2).map(t => (
                            <span key={t} style={{fontSize: 10, padding: "2px 6px", background: "#f1f5f9", borderRadius: 999 }}>
                                {t.toUpperCase()}
                            </span>
                        ))}
                    </div>
                )} 
            </div>
        </div>
    );
}


