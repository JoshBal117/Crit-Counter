export type Product = {
    id: string;
    name: string;
    price: number; // in cents
    image: string; // URL
    tags?: string[];
};

export const products: Product[] = [
    { id: "1",  name: "Dungeons & Dragons Player's Handbook", price: 4999, image: "/images/rpg/core/wotc-phb-2024.jpg", tags: ["RPG","Core Rulebook"] },
  { id: "2",  name: "Pathfinder Core Rulebook 2nd Edition", price: 5999, image: "/images/rpg/core/pathfinder-2nd-edition.png", tags: ["RPG","Core Rulebook"] },
  { id: "3",  name: "Warhammer 40K Starter Set",            price:12499, image: "/images/miniatures/w40k/warhammer-starter-set.jpg", tags: ["Miniature","Warhammer"] },
  { id: "4",  name: "Magic: The Gathering Final Fantasy Booster Pack", price: 799, image: "/images/tcg/mtg/ff7-booster-pack.jpg", tags: ["Card Game","Magic"] },
  { id: "5",  name: "Yu-Gi-Oh! Blue-Eyes White Destiny Structure Deck", price: 999, image: "/images/tcg/yugioh/be-wd-sdeck.jpg", tags: ["Card Game","Yu-Gi-Oh"] },
  { id: "6",  name: "Board Game: Settlers of Catan",         price: 4999, image: "/images/boardgames/settlers-of-catan.jpg", tags: ["Board Game"] },
  { id: "7",  name: "Dice Set Dusty Blue - Polyhedral RPG Dice", price:1499, image: "/images/dice/dusty-bd-set.jpg", tags: ["Dice"] },
  { id: "8",  name: "Tabletop Terrain - Sci-Fi Scenery Set",  price: 2999, image: "/images/terrain/scifi-terrain.jpg", tags: ["Terrain"] },
  { id: "9",  name: "Dragonlance: Shadow of the Dragon Queen (EN)", price: 2999, image: "/images/rpg/adv-module/dl-stdq.jpg", tags: ["Adventure Module"] },
  { id: "10", name: "Arcane Tinmen Dragon Matte Emerald Sleeves- Dragon Shield", price: 499, image: "/images/decksleeves/color/green-drgn-sleeves.jpg", tags: ["Accessories","Card Sleeves"]}
];

export function getProductById(id: string | undefined) {
    if (!id) return undefined;
    return products.find(p => p.id === id);
}