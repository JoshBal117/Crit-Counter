import type { FormEvent } from "react";

type Props = {
  q: string;
  category: string;
  setQ: (v: string) => void;
  setCategory: (v: string) => void;
  onClear: () => void;
  count: number;
};

const CATS = [
  { value: "", label: "All categories" },
  { value: "tcg", label: "Trading Cards" },
  { value: "rpg", label: "RPG" },
  { value: "miniature", label: "Miniature" },
  { value: "dice", label: "Dice" },
  { value: "boardgame", label: "Board Games" },
  { value: "accessories", label: "Accessories" },
  { value: "terrain", label: "Terrain" },
];

export default function FilterBar({
  q,
  category,
  setQ,
  setCategory,
  onClear,
  count,
}: Props) {
  function onSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className="mb-4 grid gap-3 sm:grid-cols-3">
      {/* Search */}
      <div>
        <label className="block text-sm mb-1">Search</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-full h-11 px-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-11 px-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {CATS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Summary / Clear */}
      <div className="flex items-end justify-between gap-2">
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
