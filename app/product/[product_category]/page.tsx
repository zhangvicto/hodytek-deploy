"use client";

// Import necessary modules and components
import Footer from '../../footer';
import Menu from '../../menu';
import Image from 'next/image';
import { ContactButton } from '../../contact-button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import publicDataURL from '@/app/dataURL';

type Product = {
  name: string;
  id: string;
  image: string;
  description: string;
};

type ProductSubcategory = {
  name: string;
  products: Product[];
}

type ProductAll = {
  name: string;
  slug: string;
  subcategories: ProductSubcategory[];
};

export default function ProductPage({ params }: { params: { product_category: string } }) {
  // Fetch all product data
  const [productAll, setProductAll] = useState<ProductAll>();
  const [productSubcategory, setProductSubcategory] = useState<ProductSubcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductTypes() {
      setLoading(true);
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const response = await fetch(publicDataURL('data.json'));
        const data = await response.json();

        const productAll = (Object.values(data) as ProductAll[]).find(
          (p: ProductAll) => p.slug === params.product_category
        );

        setProductAll(productAll);
        setProductSubcategory(productAll?.subcategories || [])

      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductTypes();
  }, []);

  // console.log(productSubcategory)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // Filter products based on the selected subcategory and search term
  const filteredProducts = Object.values(productSubcategory)
    .filter((subcategory) => selectedSubcategory === '' || subcategory.name === selectedSubcategory)
    .flatMap((subcategory) => subcategory.products)
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (

    <div className="bg-white">
      <Menu />
      {loading && <div>Loading...</div>}
      {!loading && productAll &&
        <div className="px-10 lg:px-40 text-sky-900 flex flex-col lg:flex-row">
          {/* Filter and Search Section */}
          <div className="lg:w-1/4 w-full p-4 lg:border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-2">{productAll.name}</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div>
              <h2 className="text-lg font-semibold mb-2">Filter by Subcategory</h2>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">All Subcategories</option>
                {Object.values(productSubcategory).map((subcategory) => (
                  <option key={subcategory.name} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4 w-full p-4">
            {/* <h1 className="text-2xl font-bold py-2">{productSubcategory.name}</h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border p-4 rounded shadow hover:shadow-md transition-shadow">
                  <Link href={`/product/${params.product_category}/${product.id}`} className="text-sky-500 hover:underline mt-2 block">
                    <div style={{ height: 200, overflow: 'hidden' }}>
                      <Image src={product.image} alt={product.name} height={200} width={300} object-fit="contain" className="w-full" />
                    </div>
                  </Link>

                  <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                  {/* <p className="text-sm text-gray-600">{product.description}</p> */}
                  <Link href={`/product/${params.product_category}/${product.id}`} className="text-sky-500 hover:underline mt-2 block">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      <div className="px-10 lg:px-40">
        <h1 className="text-2xl font-bold py-2 text-sky-900">Need Help?</h1>
        <ContactButton />
      </div>
      <Footer />
    </div>

  );
}
