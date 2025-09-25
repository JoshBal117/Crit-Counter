import { imagePath } from "../utils/assetPath";

export type Product = {
    id: string;
    name: string;
    price: number; // in cents
    image: string; // URL
    category: "tcg" | "rpg" | "miniature" | "boardgame" | "dice" | "terrain" | "accessories";
    tags?: string[];
};

const img = (p: string) => imagePath(p);

export const  curated: Product[] = [
  { id: "3",  name: "Warhammer 40K Starter Set",            price:12499, image: img("miniatures/w40k/warhammer-starter-set.jpg"), category: "miniature", tags: ["Miniature","Warhammer"] },
  { id: "4",  name: "Magic: The Gathering Final Fantasy Booster Pack", price: 799, image: img("tcg/mtg/ff/ff7-booster-pack.jpg"), category: "tcg", tags: ["Card Game","Magic"] },
  { id: "5",  name: "Yu-Gi-Oh! Blue-Eyes White Destiny Structure Deck", price: 999, image: img("tcg/yugioh/be-wd-sdeck.jpg"), category: "tcg", tags: ["Card Game","Yu-Gi-Oh"] },
  { id: "6",  name: "Board Game: Settlers of Catan",         price: 4999, image: img("boardgames/settlers-of-catan.jpg"), category: "boardgame", tags: ["Board Game"] },
  { id: "7",  name: "Dice Set Dusty Blue - Polyhedral RPG Dice", price:1499, image: img("dice/dusty-bd-set.jpg"), category: "dice", tags: ["Dice"] },
  { id: "8",  name: "Tabletop Terrain - Sci-Fi Scenery Set",  price: 2999, image: img("terrain/scifi-terrain.jpg"), category: "terrain", tags: ["Terrain"] },
  { id: "9",  name: "Dragonlance: Shadow of the Dragon Queen (EN)", price: 2999, image: img("rpg/adv-module/dl-stdq.jpg"), category: "rpg", tags: ["Adventure Module"] },
  { id: "10", name: "Arcane Tinmen Dragon Matte Emerald Sleeves- Dragon Shield", price: 499, image: img("decksleeves/color/green-drgn-sleeves.jpg"), category: "accessories", tags: ["Accessories","Card Sleeves"]}
];

const $ = (n: number) => Math.round(n*100);

import {genDice, genTcg, buildTcgEntries, type TcgBrandConfig} from "./generate"

const diceGenerated = genDice([
    "Amethyst", "Azure", "Crimson", "Emerald", "Obsidian", "Pearl", "Rose", "Sunset", "Teal", "Violet", "Ice Blue", "Royal Purple",
    "Matte Black",
]);

const tcgConfig: TcgBrandConfig[] = [
  // MTG
  {
    brand: "MTG",
    base: "mtg",
    simple: [
      { set: "Modern Horizons 3", kind: "Booster Pack", price: 7.99,  file: "mh3/booster-pack" },
      { set: "Modern Horizons 3", kind: "Booster Box",  price: 175.99, file: "mh3/booster-box"  },
    ],
    groups: [
      {
        set: "Modern Horizons 3",
        kind: "Commander Deck",
        defaultPrice: 44.99,
        folder: "mh3/commander",
        variants: [
          { slug: "eldrazi-incursion",   label: "Eldrazi Incursion",   price: 49.99 },
          { slug: "graveyard-overdrive", label: "Graveyard Overdrive", price: 52.99 },
          { slug: "creative-energy",     label: "Creative Energy",     price: 45.99 },
          { slug: "tricky-terrain",      label: "Tricky Terrain",      price: 48.99 },
        ],
      },
    ],
  },

  // Yu-Gi-Oh!
  {
    brand: "Yu-Gi-Oh!",
    base: "yugioh",
    simple: [
      { set: "25th Anniversary", kind: "Booster Pack",  price: 4.99, file: "25th/booster-pack" },
      { set: "25th Anniversary", kind: "Booster Box",   price: 64.99, file: "25th/booster-box"  },
    ],
    groups: [
      {
        set: "Structure Deck",
        kind: "Structure Deck",
        defaultPrice: 11.99,
        folder: "structure",
        variants: [
          { slug: "yugi-muto",                   label: "Yugi Muto",                   price: 65.99 },
          { slug: "seto-kaiba",                  label: "Seto Kaiba",                  price: 65.99 },
          { slug: "blue-eyes-white-dragon",      label: "Blue-Eyes White Dragon",      price: 19.99 },
          { slug: "legend-of-the-crystal-beast", label: "Legend of the Crystal Beast", price: 24.99 },
          { slug: "beware-of-traptrix",          label: "Beware of Traptrix",          price: 15.99 },
          { slug: "fire-kings",                  label: "Fire Kings",                   price: 11.99 },
          { slug: "the-crimson-king",            label: "The Crimson King",            price: 25.99 },
          { slug: "sacred-beasts",               label: "Sacred Beasts",               price: 22.99 },
        ],
      },
    ],
  },

  // Pokemon
  {
    brand: "Pokemon",
    base: "pokemon",
    simple: [
      { set: "Scarlet Violet", kind: "Booster Pack",      price: 8.99,  file: "scarlet-violet/booster-pack" },
      { set: "Scarlet Violet", kind: "Booster Box",       price: 68.99, file: "scarlet-violet/booster-box"  },
      { set: "Scarlet Violet", kind: "Elite Trainer Box", price: 178.99, file: "scarlet-violet/elite-trainer-box" },
    ],
    groups: [
      {
        set: "Battle Deck",
        kind: "Starter Deck",
        defaultPrice: 12.99,
        folder: "battle-decks",
        variants: [
          { slug: "zapdos-ex",    label: "Zapdos EX",   price: 16.99 },
          { slug: "charizard-ex", label: "Charizard EX", price: 69.99 },
          { slug: "lucario-ex",   label: "Lucario EX",  price: 25.99 },
        ],
      },
    ],
  },

  // Lorcana
  {
    brand: "Lorcana",
    base: "lorcana",
    simple: [
      { set: "The First Chapter",    kind: "Booster Pack",       price: 4.99,   file: "the-first-chapter/booster-pack" },
      { set: "The First Chapter",    kind: "Box Set",            price: 65.99,  file: "the-first-chapter/box-set"      }, // optional kind label
      { set: "The First Chapter",    kind: "Gift Set",           price: 165.99, file: "the-first-chapter/gift-set"     },
      { set: "The First Chapter",    kind: "Illumineer's Trove", price: 283.99, file: "the-first-chapter/trove"        },
    ],
    groups: [
      {
        set: "The First Chapter",
        kind: "Starter Deck",
        defaultPrice: 16.99,
        folder: "the-first-chapter/starters",
        variants: [
          { slug: "amber-amethyst", label: "Amber & Amethyst" },
          { slug: "sapphire-steel", label: "Sapphire & Steel" },
          { slug: "emerald-ruby",   label: "Emerald & Ruby"   },
        ],
      },
      {
        set: "Rise of the Floodborn",
        kind: "Starter Deck",
        defaultPrice: 16.99,
        folder: "rise-of-the-floodborn/starters",
        variants: [
          { slug: "amber-sapphire", label: "Amber & Sapphire" },
          { slug: "amethyst-steel", label: "Amethyst & Steel" },
        ],
      },
    ],
  },
];

const rpgBooks: Product[] = [
    { id: "rpg-dnd-phb-2024", name: "D&D Player's Handbook (2024)", price: $(49.99), image: img("rpg/dnd/phb-2024.jpg"), category: "rpg", tags: ["RPG","D&D","Core Rulebook"] },
  { id: "rpg-dnd-dmg-2024", name: "D&D Dungeon Master's Guide (2024)", price: $(49.99), image: img("rpg/dnd/dmg-2024.jpg"), category: "rpg", tags: ["RPG","D&D","Core Rulebook"] },
  { id: "rpg-dnd-mm-2024",  name: "D&D Monster Manual (2024)", price: $(49.99), image: img("rpg/dnd/monster-manual-2024.jpg"), category: "rpg", tags: ["RPG","D&D","Bestiary"] },
  { id: "rpg-dnd-xge",      name: "Xanathar’s Guide to Everything", price: $(39.95), image: img("rpg/dnd/xanathars-guide.jpg"), category: "rpg", tags: ["RPG","D&D","Supplement"] },
  { id: "rpg-dnd-tce",      name: "Tasha’s Cauldron of Everything", price: $(39.95), image: img("rpg/dnd/tashas-cauldron.jpg"), category: "rpg", tags: ["RPG","D&D","Supplement"] },

  // ---- Pathfinder 2e Core
  { id: "rpg-pf2-core",     name: "Pathfinder 2e Core Rulebook", price: $(59.99), image: img("rpg/pathfinder/pf2/pf2-core.jpg"), category: "rpg", tags: ["RPG","Pathfinder","Core Rulebook"] },
  { id: "rpg-pf2-bestiary", name: "Pathfinder 2e Bestiary",      price: $(49.99), image: img("rpg/pathfinder/pf2/pf2-bestiary.jpg"), category: "rpg", tags: ["RPG","Pathfinder","Bestiary"] },
  { id: "rpg-pf2-apg",      name: "Pathfinder 2e Advanced Player’s Guide", price: $(49.99), image: img("rpg/pathfinder/pf2/pf2-apg.jpg"), category: "rpg", tags: ["RPG","Pathfinder","Supplement"] },
  { id: "rpg-pf2-gmg",      name: "Pathfinder 2e Gamemastery Guide",       price: $(44.99), image: img("rpg/pathfinder/pf2/pf2-gmg.jpg"), category: "rpg", tags: ["RPG","Pathfinder","GM"] },
  { id: "rpg-pf2-gmc",    name: "Pathfinder 2e GM Core",                   price: $(59.99), image: img("rpg/pathfinder/pf2/pf2-gmcore.jpg"), category: "rpg", tags: ["RPG","Pathfinder","GM"] },

  // ---- Star Wars RPG (Fantasy Flight / Edge Studio lines)
  { id: "rpg-sw-eote",      name: "Star Wars: Edge of the Empire Core Rulebook", price: $(59.95), image: img("rpg/star-wars/eote-core.jpg"), category: "rpg", tags: ["RPG","Star Wars","Core Rulebook"] },
  { id: "rpg-sw-aor",       name: "Star Wars: Age of Rebellion Core Rulebook",  price: $(59.95), image: img("rpg/star-wars/aor-core.jpg"), category: "rpg", tags: ["RPG","Star Wars","Core Rulebook"] },
  { id: "rpg-sw-fad",       name: "Star Wars: Force and Destiny Core Rulebook", price: $(59.95), image: img("rpg/star-wars/fad-core.jpg"), category: "rpg", tags: ["RPG","Star Wars","Core Rulebook"] },
  { id: "rpg-sw-rots",      name: "Star Wars: Rise of the Separatists", price: $(49.95), image: img("rpg/star-wars/rots-source.jpg"), category: "rpg", tags: ["RPG","Star Wars","Adventure Module"] },
  { id: "rpg-sw-up",     name: "Star Wars: Unlimited Power", price: $(49.95), image: img("rpg/star-wars/up-source.jpg"), category: "rpg", tags: ["RPG","Star Wars","Supplement"] },
  { id: "rpg-sw-sof",     name: "Star Wars: Suns of Fortune", price: $(49.95), image: img("rpg/star-wars/sof-source.jpg"), category: "rpg", tags: ["RPG","Star Wars","Supplement"] },
  { id: "rpg-sw-sot",     name: "Star Wars: Stay on Target", price: $(24.95), image: img("rpg/star-wars/sot-source.jpg"), category: "rpg", tags: ["RPG","Star Wars","Supplement"] },
];


// Build entries once, then convert to Product[]
const tcgProducts = genTcg(buildTcgEntries(tcgConfig));

// Final catalog export
export const products: Product[] = [
  ...curated,
  ...diceGenerated,
  ...tcgProducts,
  ...rpgBooks,
];

// Lookup helper
export function getProductById(id: string | undefined) {
  if (!id) return undefined;
  return products.find((p) => p.id === id);
}

// Dev duplicate-id warning
if (import.meta.env.DEV) {
  const ids = new Set<string>();
  for (const p of products) {
    if (ids.has(p.id)) console.warn("Duplicate product id:", p.id, p.name);
    ids.add(p.id);
  }}