import data from "../public/data.json";
export type Product = {
  name: string;
  id: string;
  image: string;
  description: string;
  datasheet: string;
};
export type Category = {
  name: string;
  slug: string;
  image: string;
  subcategories: Record<string, { name: string; products: Product[] }>;
};
export const categories: Category[] = Object.values(data);
const displayNames: Record<string, string> = {
  "ul-and-csa-certified-cables": "UL & CSA-certified cables",
  "products-for-hazardous-and-harsh-locations": "Hazardous area equipment",
  "extremely-advanced-pipe-and-cable-penetration-sealing-systems":
    "Pipe & cable sealing systems",
};
export const catalogCategories = [
  {
    name: "Cable glands & accessories",
    slug: "cable-glands",
    image: "/images/cable-glands.png",
  },
  ...categories.map((category) => ({
    ...category,
    name: displayNames[category.slug] || category.name,
  })),
];
