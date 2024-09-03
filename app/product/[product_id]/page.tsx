// app/product/[product_id]/page.tsx
import { notFound } from 'next/navigation';

const products: { [key: string]: { name: string; description: string; image: string } } = {
  "product-a": { name: "Product A", description: "Description for Product A", image: "/images/product-a.jpg" },
  "product-b": { name: "Product B", description: "Description for Product B", image: "/images/product-b.jpg" },
  "product-c": { name: "Product C", description: "Description for Product C", image: "/images/product-c.jpg" },
  "product-d": { name: "Product D", description: "Description for Product D", image: "/images/product-d.jpg" },
  "product-e": { name: "Product E", description: "Description for Product E", image: "/images/product-e.jpg" },
  "product-f": { name: "Product F", description: "Description for Product F", image: "/images/product-f.jpg" },
  "product-g": { name: "Product G", description: "Description for Product G", image: "/images/product-g.jpg" },
  "product-h": { name: "Product H", description: "Description for Product H", image: "/images/product-h.jpg" },
  "product-i": { name: "Product I", description: "Description for Product I", image: "/images/product-i.jpg" },
  "product-j": { name: "Product J", description: "Description for Product J", image: "/images/product-j.jpg" },
  "product-k": { name: "Product K", description: "Description for Product K", image: "/images/product-k.jpg" },
  "product-l": { name: "Product L", description: "Description for Product L", image: "/images/product-l.jpg" },
};

export async function generateStaticParams() {
  const productIds = Object.keys(products);
  return productIds.map((id) => ({ product_id: id }));
}

export default function ProductDetailPage({ params }: { params: { product_id: string } }) {
  const product = products[params.product_id];

  if (!product) {
    return <p className="text-red-500">Product not found</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded shadow" />
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
