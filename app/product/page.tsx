"use client";

import { useState, useEffect } from 'react';
import Footer from '../footer';
import Menu from '../menu';
import Image from 'next/image';
import { ContactButton } from '../contact-button';
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
}

type ProductAll = {
  name: string;
  slug: string;
  subcategories: ProductSubcategory[];
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
  const [productData, setProductData] = useState<ProductAll[]>([]);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const response = await fetch(`${basePath}/data.json`);
        const data = await response.json();

        setProductData(Object.values(data));
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchProductData();
  }, []);

  return (
    <div className="bg-white text-sky-900">
      <Menu />
      <ProductPage productData={productData} />
      <Footer />
    </div>
  );
}

function ProductPage({ productData }: { productData: ProductAll[] }) {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (productData.length > 0) {
      // Flatten all products into a single array
      const products: Product[] = [];

      productData.forEach((category) => {
        for (const subcategory of Object.values(category.subcategories)) {
          subcategory.products.forEach((product) => {
            products.push(product);
          });
        }
      }
      )
      // console.log(products)

      // Shuffle and select 6 random products
      const shuffled = products.sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 6));
    }
  }, [productData]);

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
      <div className=" hidden md:block lg:block">
        <h1 className="px-10 lg:px-40 text-2xl font-bold pb-5">Browse Our Products</h1>
        <div className="relative w-full overflow-hidden pb-5">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {Array.from({ length: Math.ceil(randomProducts.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="flex-shrink-0 w-full flex divide-x-2">
                {randomProducts.slice(slideIndex * 3, slideIndex * 3 + 3).map((product) => {

                  return (
                    <div key={product.id} className="w-1/3 px-2">
                      {productData && (
                        <Link target="_blank" rel="noopener noreferrer" href={`/product/${findSlugByProductId(productData, product.id)}/${product.id}`} className="block">
                          <Image
                            width="500"
                            height="200"
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-contain"
                          />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {productData && randomProducts.length > 3 ? (
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
              <button
                onClick={handlePrevious}
                className="pointer-events-auto text-sky-900 px-4 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

              </button>
              <button onClick={handleNext} className="pointer-events-auto text-sky-900 px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          ) : <LoadSpinner />}
        </div>
      </div>

      {/* Categories */}
      <div className="px-10 lg:px-40">
        <h1 className="text-2xl font-bold py-2">Product Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Type Bars */}
          {Object.values(productData).map((productCategory) => (
            <div key={productCategory.slug} className="p-4 rounded shadow hover:shadow-md transition-shadow">
            <Link href={`/product/${productCategory.slug}`} className="text-sky-500 hover:underline mt-2 block">
              <div style={{ height: 200, overflow: 'hidden' }}>
                <Image src={getFirstProductImage(productCategory)} alt={productCategory.name + " image"} height={200} width={300} object-fit="contain" className="w-full" />
              </div>
            </Link>

            <h3 className="mt-2 text-lg font-bold">{productCategory.name}</h3>
          </div>
          ))}
        </div>
      </div>

      <div className="px-10 mt-10 lg:px-40">
        <h1 className="text-2xl font-bold py-2">Need Help?</h1>
        <ContactButton />
      </div>
    </div>
  );
}

function findSlugByProductId(productData: ProductAll[], productId: string): string | null {
  // Iterate over all main categories
  for (const category of productData) {
    // Iterate over all subcategories in each main category
    for (const subcategory of Object.values(category.subcategories)) {
      // Iterate over all products in each subcategory
      for (const product of subcategory.products) {
        if (product.id === productId) {
          return category.slug; // Return the main category name if the product ID matches
        }
      }
    }
  }

  return null; // Return null if no product is found with the given ID
}

function getFirstProductImage(category: ProductAll): string {
  // Convert subcategories to an array
  const subcategories = Object.values(category.subcategories);

  // Check if the category has subcategories
  if (!subcategories.length) {
      return ""; // Return an empty string if there are no subcategories
  }

  // Find the first subcategory that has products
  for (const subcategory of subcategories) {
      if (subcategory.products.length > 0) {
          // Return the image path of the first product found
          return subcategory.products[0].image;
      }
  }

  return ""; // Return an empty string if no products are found in any subcategory
}
