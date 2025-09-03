import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import FilterBar from "../../components/FilterBar";
import { products } from "../data/Product"; // <-- plural

const norm = (s: string) => (s || "").toLowerCase();

export default function Home() {
  // URL params (shareable + persist on refresh)
  const [params, setParams] = useSearchParams();

  const q    = params.get("q")    ?? "";
  const cat  = params.get("cat")  ?? "";
  const sort = params.get("sort") ?? "";
  const min  = params.get("min")  ?? "";
  const max  = params.get("max")  ?? "";

  // helper to update a single param
  const setParam = (key: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(key, v);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  // setters for FilterBar
  const setQ        = (v: string) => setParam("q", v);
  const setCategory = (v: string) => setParam("cat", v);
  const setSort     = (v: string) => setParam("sort", v);
  const setMin      = (v: string) => setParam("min", v.replace(/[^\d.]/g, ""));
  const setMax      = (v: string) => setParam("max", v.replace(/[^\d.]/g, ""));
  const onClear     = () => setParams(new URLSearchParams(), { replace: true });

  // filter + sort (all client-side)
  const filteredSorted = useMemo(() => {
    const qn = norm(q);
    const cn = norm(cat);
    const minCents = min ? Math.round(parseFloat(min) * 100) : null;
    const maxCents = max ? Math.round(parseFloat(max) * 100) : null;

    // 1) filter
    let xs = products.filter((p) => {
      const matchesCat = !cn || norm(p.category) === cn;
      const hay = `${p.name} ${p.tags?.join(" ") ?? ""}`.toLowerCase();
      const matchesQ = !qn || hay.includes(qn);
      const inMin = minCents == null || p.price >= minCents;
      const inMax = maxCents == null || p.price <= maxCents;
      return matchesCat && matchesQ && inMin && inMax;
    });

    // 2) sort
    if (sort === "price_asc") xs = xs.slice().sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") xs = xs.slice().sort((a, b) => b.price - a.price);
    else if (sort === "name_asc") xs = xs.slice().sort((a, b) => a.name.localeCompare(b.name));
    // default "" = relevance (keep order)

    return xs;
  }, [q, cat, sort, min, max]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <FilterBar
        q={q}
        category={cat}
        sort={sort}
        min={min}
        max={max}
        setQ={setQ}
        setCategory={setCategory}
        setSort={setSort}
        setMin={setMin}
        setMax={setMax}
        onClear={onClear}
        count={filteredSorted.length}
      />

      {filteredSorted.length === 0 ? (
        <div className="rounded-xl border p-6 text-gray-700">
          No results. Try clearing filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSorted.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} state={{ product: p }} className="block">
              <ProductCard name={p.name} price={p.price} image={p.image} tags={p.tags} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
