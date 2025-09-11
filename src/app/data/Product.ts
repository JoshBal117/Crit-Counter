export type Product = {
    id: string;
    name: string;
    price: number; // in cents
    image: string; // URL
    category: "tcg" | "rpg" | "miniature" | "boardgame" | "dice" | "terrain" | "accessories";
    tags?: string[];
};

export const  curated: Product[] = [
    { id: "1",  name: "Dungeons & Dragons Player's Handbook", price: 4999, image: "/images/rpg/core/wotc-phb-2024.jpg",category: "rpg", tags: ["RPG","Core Rulebook"] },
  { id: "2",  name: "Pathfinder Core Rulebook 2nd Edition", price: 5999, image: "/images/rpg/core/pathfinder-2nd-edition.png", category: "rpg", tags: ["RPG","Core Rulebook"] },
  { id: "3",  name: "Warhammer 40K Starter Set",            price:12499, image: "/images/miniatures/w40k/warhammer-starter-set.jpg", category: "miniature", tags: ["Miniature","Warhammer"] },
  { id: "4",  name: "Magic: The Gathering Final Fantasy Booster Pack", price: 799, image: "/images/tcg/mtg/ff/ff7-booster-pack.jpg", category: "tcg", tags: ["Card Game","Magic"] },
  { id: "5",  name: "Yu-Gi-Oh! Blue-Eyes White Destiny Structure Deck", price: 999, image: "/images/tcg/yugioh/be-wd-sdeck.jpg", category: "tcg", tags: ["Card Game","Yu-Gi-Oh"] },
  { id: "6",  name: "Board Game: Settlers of Catan",         price: 4999, image: "/images/boardgames/settlers-of-catan.jpg", category: "boardgame", tags: ["Board Game"] },
  { id: "7",  name: "Dice Set Dusty Blue - Polyhedral RPG Dice", price:1499, image: "/images/dice/dusty-bd-set.jpg", category: "dice", tags: ["Dice"] },
  { id: "8",  name: "Tabletop Terrain - Sci-Fi Scenery Set",  price: 2999, image: "/images/terrain/scifi-terrain.jpg", category: "terrain", tags: ["Terrain"] },
  { id: "9",  name: "Dragonlance: Shadow of the Dragon Queen (EN)", price: 2999, image: "/images/rpg/adv-module/dl-stdq.jpg", category: "rpg", tags: ["Adventure Module"] },
  { id: "10", name: "Arcane Tinmen Dragon Matte Emerald Sleeves- Dragon Shield", price: 499, image: "/images/decksleeves/color/green-drgn-sleeves.jpg", category: "accessories", tags: ["Accessories","Card Sleeves"]}
];

import {genDice, genTcg, brandBlocks, deckVariantsAsEntries} from "./generate"

const diceGenerated = genDice([
    "Amethyst", "Azure", "Crimson", "Emerald", "Obsidian", "Pearl", "Rose", "Sunset", "Teal", "Violet", "Ice Blue", "Royal Purple",
    "Matte Black",
]);

const mtg = genTcg([
    ...brandBlocks("MTG", "mtg/mh3", [
        {set: "Modern Horizons 3", kind: "Booster Pack", price: 7.99, file: "booster-pack"},
        {set: "Modern Horizons 3", kind: "Booster Box", price: 175.99, file: 'booster-box'},
        {set: "Modern Horizons 3", kind: "Commander Deck", price: 45.99, file: "commander-deck-grave"},
    ]),

    ...deckVariantsAsEntries( //the first of multiple factory functions
        "MTG", 
        "mtg/mh3/commander",
        "Modern Horizons 3",
        "Commander Deck",
        44.99,
        [
            {slug: "eldrazi-incursion",    label: "Eldrazi Incursion",  price: 49.99},
            {slug: "graveyard-overdrive", label: "Graveyard Overdrive", price: 52.99},
            {slug: "creative-energy",     label: "Creative Energy",     price: 45.99},
            {slug: "tricky-terrain",      label: "Tricky Terrain",      price: 48.99,}

        ]
    ),
]);

const yugioh = genTcg([
    ...brandBlocks("Yu-Gi-Oh!","yugioh/25th",[
        {set: "25th Anniversary", kind: "Booster Pack", price: 4.99, file: "booster-pack" },
        {set: "25th Anniversary", kind: "Booster Box", price: 64.99, file: "booster-box" },
        {set: "25th Anniversary", kind: "Structure Deck", price: 34.99, file: "structure-deck" },
]),

    ...deckVariantsAsEntries( //another factory function
    "Yu-Gi-Oh!",
    "yugioh/structure",    // images base folder
    "Structure Deck",      // family name
    "Structure Deck",      // kind
    11.99,                 // default price
    [
      { slug: "yugi-muto",                   label: "Yugi Muto",                   price: 65.99},
      { slug: "seto-kaiba",                  label: "Seto Kaiba",                  price: 65.99},
      { slug: "blue-eyes-white-dragon",      label: "Blue-Eyes White Dragon",      price: 19.99},
      { slug: "legend-of-the-crystal-beast", label: "Legend of the Crystal Beast", price: 24.99},
      { slug: "beware-of-traptrix",          label: "Beware of Traptrix",          price: 15.99},
      { slug: "fire-kings",                  label: "Fire Kings",                  price: 11.99},
      { slug: "the-crimson-king",            label: "The Crimson King",            price: 25.99},
      { slug: "sacred-beasts",               label: "Sacred Beasts",               price: 22.99},
    ]
  ),
]);

const pokemon = genTcg([
    ...brandBlocks("Pokemon", "pokemon/scarlet-violet", [
        { set: "Scarlet Violet", kind: "Booster Pack", price:8.99, file: "booster-pack" },
        { set: "Scarlet Violet", kind: "Booster Box", price:68.99, file: "booster-box" },
        { set: "Scarlet Violet", kind: "Elite Trainer Box", price:178.99, file: "elite-trainer-box" },
    ]),

    ...deckVariantsAsEntries(  //factory function
            "Pokemon",
            "pokemon/battle-decks",
            "Battle Deck",
            "Starter Deck",
            12.99,
            [
                {slug: "zapdos-ex",    label: "Zapdos EX",    price: 16.99},
                {slug: "charizard-ex", label: "Charizard EX", price: 69.99},
                {slug: "lucario-ex",  label: "Lucario EX",   price: 25.99},
            ]
    )
]);

const lorcana =genTcg([
    ...brandBlocks("Lorcana", "lorcana/the-first-chapter", [
        { set: "The First Chapter", kind: "Booster Pack", price: 4.99,         file: "booster-pack"  },
        { set: "The First Chapter", kind: "Box Set",  price: 65.99,            file: "box-set"       },
        { set: "The First Chapter", kind: "Gift Set", price: 165.99,           file: "gift-set"      },
        { set: "The First Chapter", kind: "Illumineer's Trove", price: 283.99, file: "trove"         },
    ]),
    ...deckVariantsAsEntries( //factory function
        "Lorcana",
        "lorcana/the-first-chapter/starters",
        "The First Chapter",
        "Starter Deck",
        16.99,
        [
            {slug: "amber-amythest", label: "Amber Amythest"},
            {slug: "sapphire-steel", label: "Sapphire Steel"},
            {slug: "emerald-ruby",   label: "Emerald Ruby"  },
        ]
    ),
    ...brandBlocks("Lorcana", "lorcana/rise-of-the-floodborn", [
    { set: "Rise of the Floodborn", kind: "Booster Pack",  price: 5.99,  file: "rise-booster-pack" },
    { set: "Rise of the Floodborn", kind: "Gift Set",      price: 124.99, file: "rise-gift-set"     },
    { set: "Rise of the Floodborn", kind: "Illumineer's Trove", price: 249.99, file: "rise-trove"  },
  ]),
  ...deckVariantsAsEntries(
    "Lorcana",
    "lorcana/rise-of-the-floodborn/starters",
    "Rise of the Floodborn",
    "Starter Deck",
    16.99,
        [
            {slug: "amber-sapphire", label: "Amber Sapphire"},
            {slug: "amythest-steel", label: "Amythest Steel"},
        ]
  )
    
]);

export const products: Product[] = [
    ...curated,
    ...diceGenerated,
    ...mtg,
    ...yugioh,
    ...pokemon,
    ...lorcana,
];


export function getProductById(id: string | undefined) {
    if (!id) return undefined;
    return products.find(p => p.id === id);
}

if(import.meta.env.DEV) {
    const ids = new Set<string>();
    for (const p of products) {
        if(ids.has(p.id)) console.warn("Duplicate product id : ", p.id, p.name);
        ids.add(p.id);
    }
}