import ProductCard from "../../components/ProductCard";
import { Link, useSearchParams } from "react-router-dom";
import {products} from  "../data/Product";
import {useMemo} from "react";
import FilterBar from "../../components/FilterBar";


const norm = (s:string) => s.toLowerCase();


export default function Home() {
  // Read Queary params (So URLS are shareable)
    const [params, setParams] =useSearchParams();
    const q = params.get("q") ?? "";
    const cat = params.get("cat") ?? "";

    //update the helpers that wil also push to URL
      const setQ = (v: string) => {
  const next = new URLSearchParams(params);
  if (v) {
    next.set("q", v);
  } else {
    next.delete("q");
  }
  setParams(next, { replace: true });
};


      const setCategory = (v: string) => {
  const next = new URLSearchParams(params);
  if (v) {
    next.set("cat", v);
  } else {
    next.delete("cat");
  }
  setParams(next, { replace: true });
};

       const onClear = () => {
    const next = new URLSearchParams(params);
    next.delete("q");
    next.delete("cat");
    setParams(next, { replace: true });
  };

      // Filter the products (case-insensitive)
  const filtered = useMemo(() => {
    const qn = norm(q);
    return products.filter((p) => {
      const matchesCat = cat ? p.category === cat : true;
      const hay = `${p.name} ${p.tags?.join(" ") ?? ""}`.toLowerCase();
      const matchesQ = qn ? hay.includes(qn) : true;
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
       <FilterBar
        q={q}
        category={cat}
        setQ={setQ}
        setCategory={setCategory}
        onClear={onClear}
        count={filtered.length}
      />

          {filtered.length === 0 ? (
        <div className="rounded-xl border p-6 text-gray-700">
          No results. Try clearing filters.
        </div>
      ) : (

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} state={{ product: p }} className="block">
            <ProductCard name={p.name} price={p.price} image={p.image} tags={p.tags} />
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}
