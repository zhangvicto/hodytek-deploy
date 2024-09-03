"use client";

import Footer from '../footer';
import Menu from '../menu';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { name: 'Offshore', slug: 'offshore' },
  { name: 'Marine', slug: 'marine' },
];

const productsByCategory: {
  [key: string]: { name: string; slug: string; products: { name: string; id: string; image: string }[] }[];
} = {
  offshore: [
    {
      name: "Cable Glands",
      slug: "cable-glands",
      products: [
        { name: "Product A", id: "product-a", image: "/images/product-a.jpg" },
        { name: "Product B", id: "product-b", image: "/images/product-b.jpg" },
      ],
    },
    {
      name: "Transformers",
      slug: "transformers",
      products: [
        { name: "Product C", id: "product-c", image: "/images/product-c.jpg" },
        { name: "Product D", id: "product-d", image: "/images/product-d.jpg" },
      ],
    },
    {
      name: "Generators",
      slug: "generators",
      products: [
        { name: "Product E", id: "product-e", image: "/images/product-e.jpg" },
        { name: "Product F", id: "product-f", image: "/images/product-f.jpg" },
      ],
    },
  ],
  marine: [
    {
      name: "Anchors",
      slug: "anchors",
      products: [
        { name: "Product G", id: "product-g", image: "/images/product-g.jpg" },
        { name: "Product H", id: "product-h", image: "/images/product-h.jpg" },
      ],
    },
    {
      name: "Buoys",
      slug: "buoys",
      products: [
        { name: "Product I", id: "product-i", image: "/images/product-i.jpg" },
        { name: "Product J", id: "product-j", image: "/images/product-j.jpg" },
      ],
    },
    {
      name: "Ropes",
      slug: "ropes",
      products: [
        { name: "Product K", id: "product-k", image: "/images/product-k.jpg" },
        { name: "Product L", id: "product-l", image: "/images/product-l.jpg" },
      ],
    },
  ],
};


export default function Page() {
    return (
    <div className="bg-white">
      <Menu />
      {/* Products page description */}
      <ProductPage />
      <Footer />
    </div>
  )
}

function ProductPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categorySlug: string) => {
    setExpandedCategory((prev) => (prev === categorySlug ? null : categorySlug));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Product Categories</h1>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.slug}>
            <button
              className="text-lg font-semibold text-left w-full py-2 px-4 bg-sky-100 hover:bg-sky-200 rounded"
              onClick={() => toggleCategory(category.slug)}
            >
              {category.name}
            </button>
            {expandedCategory === category.slug && (
              <div className="pl-4 mt-2 space-y-2">
                {productsByCategory[category.slug].map((productType) => (
                  <div key={productType.slug}>
                    <h3 className="font-medium">{productType.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {productType.products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="block text-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded shadow"
                          />
                          <p className="mt-2 text-gray-700">{product.name}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
