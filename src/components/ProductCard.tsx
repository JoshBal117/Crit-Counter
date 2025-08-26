type Props = {
    name: string;
    price: number;
    image: string;
    tags?: string[];

};  


export default function ProductCard({ name, price, image, tags }: Props) {
    return (
        <div className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      {/* 👇 The image is constrained here */}
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover" 
      />

      <div className="p-3">
        <h2 className="font-semibold text-sm">{name}</h2>
        <p className="text-gray-600">${(price / 100).toFixed(2)}</p>

        {/* Optional tags (like Pokemon, MTG, etc.) */}
        {tags && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

