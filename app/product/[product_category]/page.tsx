import Footer from '../../footer';
import Menu from '../../menu';
import Image from 'next/image';
import { ContactButton } from '../../contact-button';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

type Product = {
  name: string;
  id: string;
  image: string;
  description: string;
};

type ProductType = {
  name: string;
  slug: string;
  products: Product[];
};

export default async function ProductPage({ params }: { params: {product_category : string} }) {
  // Fetch all product data
  const filePath = path.join(process.cwd(), '/public/data.json');
  const fetchedData = fs.readFileSync(filePath, 'utf-8');
  const productTypes = JSON.parse(fetchedData);
  const productType = productTypes.find((p: ProductType) => p.slug === params.product_category) || null;
  const products = productType.products;

  return (
    <div className="bg-white">
      <Menu />
      {/* Products */}
      <div className="px-10 lg:px-40 text-sky-900">
        <h1 className="text-2xl font-bold py-2">{productType.name}</h1>
        <div className="text-sky-900">
          <div className="mt-2 space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 my-5">
              {productType && products.map((product: Product) => (
                <Link key={product.id} target="_blank" rel="noopener noreferrer" href={`/product/${productType.slug}/${product.id}`} className="block text-center">
                  <Image
                    width="500"
                    height="200"
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 rounded shadow"
                    style={{ objectFit: "contain" }}
                  />
                  <p className="mt-2 text-gray-700">{product.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 lg:px-40">
        <h1 className="text-2xl font-bold py-2 text-sky-900">Need Help?</h1>
        <ContactButton />
      </div>
      <Footer />
    </div>
  );
}
