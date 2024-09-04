"use client";

import { useState, useEffect } from 'react';
import Footer from '../footer';
import Menu from '../menu';
import Link from 'next/link';
import Image from 'next/image';

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

function LoadSpinner() {
  return (
    <div className="flex items-center">
      <svg className="w-8 h-8 text-sky-900 animate-spin dark:text-gray-200 fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="pl-2 text-sky-900 h-full">Products Loading...</span>
    </div>
  )
}

export default function Page() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [expandedProductType, setExpandedProductType] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductTypes() {
      try {
        // Replace with your Google Apps Script URL
        const response = await fetch('https://script.google.com/macros/s/AKfycbxKnRiX_Ih-3VN4aKfK3hEjOIMYt4xP65R8spQb2RbxXfEW4W9r6DE1o96i4yhTJoQ/exec');
        const data = await response.json();
        setProductTypes(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchProductTypes();
  }, []);

  const toggleProductType = (productTypeSlug: string) => {
    setExpandedProductType((prev) => (prev === productTypeSlug ? null : productTypeSlug));
  };

  return (
    <div className="bg-white text-sky-900">
      <Menu />
      <ProductPage productTypes={productTypes} toggleProductType={toggleProductType} expandedProductType={expandedProductType} />
      <Footer />
    </div>
  );
}

function ProductPage({ productTypes, toggleProductType, expandedProductType }: { productTypes: ProductType[], toggleProductType: (slug: string) => void, expandedProductType: string | null }) {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (productTypes.length > 0) {
      // Flatten all products into a single array
      const allProducts = productTypes.flatMap(pt => pt.products);

      // Shuffle and select 6 random products
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 6));
    }
  }, [productTypes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(randomProducts.length / 3));
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [randomProducts]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(randomProducts.length / 3)) % Math.ceil(randomProducts.length / 3));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(randomProducts.length / 3));
  };

  return (
    <div className="text-sky-900 pt-5">
      <div className="px-10 lg:px-40 hidden md:block lg:block">
        <h1 className="text-2xl font-bold pb-5">Browse Our Products</h1>
        <div className="relative w-full overflow-hidden pb-5">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {Array.from({ length: Math.ceil(randomProducts.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="flex-shrink-0 w-full flex">
                {randomProducts.slice(slideIndex * 3, slideIndex * 3 + 3).map((product) => (
                  <div key={product.id} className="w-1/3 px-2">
                    <Link href={`/product/${product.id}`} className="block">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {productTypes && randomProducts.length > 3 ? (
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
              <button
                onClick={handlePrevious}
                className="pointer-events-auto text-sky-900 px-4 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto text-sky-900 px-4 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

              </button>
            </div>
          ) : <LoadSpinner />}
        </div>

      </div>

      {/* Product Index */}
      <div className="px-10 lg:px-40">
        <h1 className="text-2xl font-bold py-2">Product Index</h1>
        <div className="text-white">
          {productTypes.map((productType) => (
            <div key={productType.slug}>
              <button
                className="flex justify-between items-center text-lg font-semibold text-left w-full py-2 mb-2 px-10 pl-5 bg-sky-900 hover:bg-sky-500"
                onClick={() => toggleProductType(productType.slug)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg> {productType.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transform transition-transform duration-300 ${expandedProductType === productType.slug ? "rotate-180" : "rotate-0"
                    }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {expandedProductType === productType.slug && (
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 my-5">
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
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 lg:px-40">
        <h1 className="text-2xl font-bold py-2">Need Help?</h1>
        <Link className="" href="/contact">Contact Us</Link>
      </div>

    </div>
  );
}
