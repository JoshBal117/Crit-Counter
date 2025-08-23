
import ProductCard from "../../components/ProductCard";
import {Link}  from "react-router-dom";

type Product = {
    id: string;
    name: string;
    price: number; 
    image: string;
    tags?: string[];
};

const products: Product[]= [
    { id: '1', name: 'Dungeons & Dragons Player\'s Handbook', price: 49.99, image: '/images/dnd_players_handbook.jpg', tags: ['RPG', 'Core Rulebook'] },
    { id: '2', name: 'Pathfinder Core Rulebook 2nd Edition', price: 59.99, image: '/images/pathfinder_core_rulebook.jpg', tags: ['RPG', 'Core Rulebook'] },
    { id: '3', name: 'Warhammer 40K Starter Set', price: 124.99, image: '/images/warhammer_40k_space_marine.jpg', tags: ['Miniature', 'Warhammer'] },
    { id: '4', name: 'Magic: The Gathering Final Fantasy Booster Pack', price: 7.99, image: '/images/mtg_booster_pack.jpg', tags: ['Card Game', 'Magic'] },
    { id: '5', name: 'Yu-Gi-Oh! Blue-Eyes White Destiny Structure Deck', price: 9.99, image: '/images/yugioh_starter_deck.jpg', tags: ['Card Game', 'Yu-Gi-Oh'] },
    { id: '6', name: 'Board Game: Settlers of Catan', price: 49.99, image: '/images/settlers_of_catan.jpg', tags: ['Board Game'] },
    { id: '7', name: 'Dice Set - Polyhedral RPG Dice', price: 14.99, image: '/images/polyhedral_dice_set.jpg', tags: ['Dice'] },
    { id: '8', name: 'Tabletop Terrain - Sci-Fi Scenery Set', price: 29.99, image: '/images/sci_fi_terrain_set.jpg', tags: ['Terrain'] },
    { id: '9', name: 'Dragonlance: Shadow of the Dragon Queen (EN)', price: 29.99, image: '/images/rpg_adventure_module.jpg', tags: ['Adventure Module'] },
    { id: '10', name: 'Arcane Tinmen Dragon Matte Emerald Sleeves- Dragon Shield', price: 4.99, image: '/images/dragon_shield_sleeves.jpg', tags: ['Accessories', 'Card Sleeves'] },
];

const money = (c:number) => '$${(c/100).toFixed(2)}';


export default function Home() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 12,
      padding: 12
    }}>
      {products.map(p => (
        <Link key={p.id} 
        to={`/product/${p.id}`}
        state={{ product: p }} 
        style={{ textDecoration: "none", color: "inherit" }}>
          <ProductCard name={p.name} price={p.price} image={p.image} tags={p.tags} />
        </Link>
      ))}
    </div>
  );
}