import Image from 'next/image';
import Footer from '../../../footer';
import Menu from '../../../menu';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

type Product = {
  name: string;
  id: string;
  image: string;
  description: string;
};

type ProductSubcategory = {
  name: string;
  products: Product[];
};

type ProductAll = {
  name: string;
  slug: string;
  subcategories: ProductSubcategory[];
};

type GeneratedParams = {
  product_category: string;
  product_id: string;
}[];

export async function generateStaticParams({ params }: { params: { product_category: string } }) {
  try {
    // Fetch product types and flatten products to get all product IDs
    const filePath = path.join(process.cwd(), '/public/data.json');
    const fetchedData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fetchedData) as Record<string, ProductAll>;
    const productAll = Object.values(data).find(
      (p) => p.slug === params.product_category
    );

    if (!productAll) {
      throw new Error(`No product category found for slug: ${params.product_category}`);
    }

    const generatedParams: GeneratedParams = [];

    // Iterate over all subcategories
    for (const subcategory of Object.values(productAll.subcategories)) {
      subcategory.products.forEach((product) => {
        generatedParams.push({ product_category: productAll.slug, product_id: product.id });
      });
    }

    // console.log(generatedParams)

    return generatedParams;
  } catch (error) {
    console.error('Error fetching product data for static params:', error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { product_category: string; product_id: string };
}) {
  // Fetch all product data
  const filePath = path.join(process.cwd(), '/public/data.json');
  const fetchedData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fetchedData) as Record<string, ProductAll>;
  const productAll = Object.values(data).find(
    (p) => p.slug === params.product_category
  );

  if (!productAll) {
    return <div>Product category not found.</div>;
  }
  // Get the product object for current product
  const product = getProductById(productAll, params.product_id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="bg-white">
      <Menu />
      <div className="text-sky-900 px-10 lg:px-40">
        <div className="grid lg:grid-cols-2 pt-10">
          <div>
            {/* Title */}
            <div className="text-3xl font-bold py-2">{product.name}</div>
            {/* Product ID */}
            <div className="text-gray-400 mb-2">
              Product ID: {product.id.replace('_', '/')}
            </div>
            {/* Back Button */}
            <Link className="hidden md:inline-flex mb-5 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              href={`/product/${productAll.slug}`}>
              Back to {productAll.name}
            </Link>

            {/* Image */}
            <Image
              className="h-80 object-cover rounded shadow"
              src={product.image}
              alt={product.name}
              width={500}
              height={200}
            />
          </div>

          {/* Description */}
          <div className="text-sky-900 my-5 lg:mx-5">{product.description}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function getProductById(productAll: ProductAll, productId: string): Product | null {
  for (const subcategory of Object.values(productAll.subcategories)) {
    for (const product of subcategory.products) {
      if (product.id === productId) {
        return product;
      }
    }
  }
  return null;
}

function getProductCategory(productAll: ProductAll, productId: string): string | null {
  for (const subcategory of Object.values(productAll.subcategories)) {
    for (const product of subcategory.products) {
      if (product.id === productId) {
        return subcategory.name;
      }
    }
  }
  return null;
}

