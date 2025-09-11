import type {Product} from "./Product"

const cents = (d:number) => Math.round(d*100);


let seq = 100;
const nextId = (prefix: string) => `${prefix}-${seq++}`



export function genDice(colors: string[], basePrice = 14.99): Product[] {
    return colors.map((color) => {
        const slug = color.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return{
            id:nextId("dice"),
            name: `Polyhedral RPG Dice - ${color}`,
            price: cents(basePrice),
            image: `/images/dice/${slug}-set.jpg`,
            category: "dice",
            tags: ["Dice", color],

        };
    });
}


export type TcgBrand = "MTG" | "Yu-Gi-Oh!" | "Pokemon" | "Lorcana";
export type TcgKind = 
    | "Booster Pack"
    | "Booster Box"
    | "Starter Deck"
    | "Structure Deck" //"Yugioh" decks
    | "Commander Deck" // "MTG" decks
    | "Elite Trainer Box" // Pokemon
    | "Gift Set"  // Lorcana
    | "Illumineer's Trove"
    | string;

export type TcgEntry = {
    brand: TcgBrand;
    set: string;
    kind: TcgKind;
    price: number;
    imagePath: string;
    tags?: string[];
};

export function genTcg(entries: TcgEntry[]): Product[] {
    return entries.map ((e) => ({
        id: nextId("tcg"),
        name: `${e.brand} ${e.set}`,
        price: cents(e.price),
        image: `/images/tcg/${e.imagePath}.jpg`,
        category: "tcg",
        tags: ["Card Game", e.brand, e.kind, ...(e.tags?? [])],
    }));
}

export function deckVariants(
  set: string,           // e.g., "Modern Horizons 3" OR "Structure Deck"
  kind: TcgKind,         // e.g., "Commander Deck" / "Starter Deck" / "Structure Deck"
  defaultPrice: number,  // dollars; can be overridden per variant
  variants: Array<{ slug: string; label: string; price?: number; extraTags?: string[] }>
): Array<{ set: string; kind: TcgKind; price: number; file: string; tags?: string[] }> {
  return variants.map(v => ({
    set,
    kind,
    price: v.price ?? defaultPrice,
    file: v.slug,                          // becomes <folder>/<slug>.jpg
    tags: v.extraTags ? [v.label, ...v.extraTags] : [v.label],
  }));
}

   type DeckVariant = { slug: string; label: string; price?: number; extraTags?: string[] };

// helper that flattens to TcgEntry[]; Product stays unchanged
export function deckVariantsAsEntries(
  brand: TcgBrand,
  baseFolder: string,
  family: string,
  kind: TcgKind,
  fallbackPrice: number,
  variants: DeckVariant[]
): TcgEntry[] {
  return variants.map(v => ({
    brand,
    set: `${family} — ${v.label}`,  // puts variant in the product name
    kind,
    price: v.price ?? fallbackPrice,
    imagePath: `${baseFolder}/${v.slug}`,
    tags: v.extraTags ? [family, v.label, ...v.extraTags] : [v.label],
  }));
}

export function brandBlocks(
  brand: TcgBrand,
  folder: string,
  items: Array<{ set: string; kind: TcgKind; price: number; file: string; tags?: string[] }>
): TcgEntry[] {
  return items.map(it => ({
    brand,
    set: it.set,
    kind: it.kind,
    price: it.price,
    imagePath: `${folder}/${it.file}`,
    tags: it.tags,
  }));
}

type SimpleItem = {
    set:string;
    kind: TcgKind;
    price: number;
    file: string;
    tags?: [];
};
type Variant= DeckVariant;
type VariantGroup = {
        set: string;
        kind: TcgKind;
        defaultPrice: number;
        folder: string;
        variants: Variant[];
};
export type TcgBrandConfig = {
    brand: TcgBrand;
    base: string;
    simple?: SimpleItem[];
    groups?: VariantGroup[];
};

export function buildTcgEntries(configs: TcgBrandConfig[]): TcgEntry[] {
    const out: TcgEntry[] = [];
    for (const cfg of configs) {
        for (const s of cfg.simple ?? []) {
            out.push({
                brand: cfg.brand,
                set: s.set,
                kind: s.kind,
                price: s.price,
                imagePath:`${cfg.base}/${s.file}`,
                tags: s.tags,
            });
        }
        for (const g of cfg.groups ?? []) {for (const v of g.variants) {
        out.push({
          brand: cfg.brand,
          set: `${g.set} — ${v.label}`,
          kind: g.kind,
          price: v.price ?? g.defaultPrice,
          imagePath: `${cfg.base}/${g.folder}/${v.slug}`,
          tags: [v.label, ...(v.extraTags ?? [])],
        });
      }}
    }

    return out;
}