import type { FormEvent } from "react";

type Props = {
  q: string;
  category: string;
  sort: string;
  min: string;
  max: string;
  setQ: (v: string) => void;
  setCategory: (v: string) => void;
  setSort: (v: string) => void;
  setMin: (v: string) => void;
  setMax: (v: string) => void;
  onClear: () => void;
  count: number;
};

const CATS = [
  { value: "",           label: "All categories" },
  { value: "tcg",        label: "Trading Cards" },
  { value: "rpg",        label: "RPG" },
  { value: "miniature",  label: "Miniatures" },
  { value: "boardgame",  label: "Board Games" },
  { value: "dice",       label: "Dice" },
  { value: "terrain",    label: "Terrain" },
  { value: "accessories",label: "Accessories" },
];

export default function FilterBar({
  q, category, sort, min, max,
  setQ, setCategory, setSort, setMin, setMax,
  onClear, count,
}: Props) {
  function onSubmit(e: FormEvent) { e.preventDefault(); }

  return (
    <form onSubmit={onSubmit} className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {/* Search */}
      <div>
        <label className="block text-sm mb-1" htmlFor="search">Search</label>
        <input
          id="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="w-full h-11 px-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm mb-1" htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-11 px-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {CATS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm mb-1" htmlFor="min">Min $</label>
          <input
            id="min"
            inputMode="numeric"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="0"
            className="w-full h-11 px-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="max">Max $</label>
          <input
            id="max"
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="100"
            className="w-full h-11 px-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm mb-1" htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full h-11 px-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="">Relevance</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="name_asc">Name A–Z</option>
        </select>
      </div>

      {/* Summary / Clear (spans a full column on small screens) */}
      <div className="sm:col-span-2 lg:col-span-4 flex items-end justify-between gap-2">
        <div className="text-sm text-gray-600">
          {count} item{count === 1 ? "" : "s"}
        </div>
        <button
          type="button"
          onClick={onClear}
          className="px-3 py-2 rounded-lg bg-gray-200 text-sm"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
