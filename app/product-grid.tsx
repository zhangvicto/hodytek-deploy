import Image from "next/image";
import Link from "next/link";
import { catalogCategories } from "./catalog";
import { Arrow } from "./ui";
export default function ProductGrid({
  items = catalogCategories,
}: {
  items?: { name: string; slug: string; image: string }[];
}) {
  return (
    <div className="product-grid">
      {items.map((category, index) => (
        <Link
          className="product-card"
          href={`/product/${category.slug}`}
          key={category.slug}
        >
          <div className="product-image">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 280px"
            />
          </div>
          <div className="product-card-text">
            <span className="card-index">
              {String(index + 1).padStart(2, "0")} / PRODUCT RANGE
            </span>
            <h3>{category.name}</h3>
            <span className="card-link">
              Explore products <Arrow />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
