import type {Product} from "./Product"

const cents = (d:number) => Math.round(d*100);


let seq = 100;
const nextId = () => `dice-${seq++}`



export function genDice(colors: string[], basePrice = 14.99): Product[] {
    return colors.map((color) => {
        const slug = color.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-");
        return{
            id:nextId(),
            name: `Polyhedral RPG Dice - ${color}`,
            price: cents(basePrice),
            image: `/images/dice/${slug}-set.jpg`,
            category: "dice",
            tags: ["Dice", color],

        };
    });
}