"use client";

// Import necessary modules and components
import Footer from '../../footer';
import Menu from '../../menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import publicDataURL from '@/app/dataURL';
import { ContactButton } from '@/app/contact-button';

type Product = {
  name: string;
  id: string;
  image: string;
  description: string;
  datasheet: string;
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

export default function ProductPage({ params }: { params: { product_category: string } }) {
  // Fetch all product data
  const [productAll, setProductAll] = useState<ProductAll>();
  const [productSubcategory, setProductSubcategory] = useState<ProductSubcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductTypes() {
      setLoading(true);
      try {
        const response = await fetch(publicDataURL('data.json'));
        const data = await response.json();

        const productAll = (Object.values(data) as ProductAll[]).find(
          (p: ProductAll) => p.slug === params.product_category
        );

        setProductAll(productAll);
        setProductSubcategory(productAll?.subcategories || []);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductTypes();
  }, [params.product_category]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter products based on the selected subcategory and search term
  const filteredProducts = Object.values(productSubcategory)
    .filter((subcategory) => selectedSubcategory === '' || subcategory.name === selectedSubcategory)
    .flatMap((subcategory) => subcategory.products)
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get the products for the current page
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }

  // Handle pagination
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    scrollToTop();
  };

  const filerDisplayCondition = filteredProducts.length <= 6;

  return (
    <div className="bg-white">
      <Menu />
      {loading && <div>Loading...</div>}
      {!loading && productAll && (
        <div className="px-10 lg:px-40 text-sky-900 flex flex-col lg:flex-row">
          {/* Filter and Search Section */}
          <div className="lg:w-1/4 w-full py-4 lg:border-r lg:pr-5 lg:mt-2 border-gray-200">
            <h2 className="text-2xl font-bold mb-2">{productAll.name}</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${filerDisplayCondition ? "hidden" : "block"} w-full p-2 border border-gray-300 rounded mb-4`}
            />

            <div className={`${filerDisplayCondition ? "hidden" : "block"}`}>
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
            <Link className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              href="/product">
              Back to Products
            </Link>
          </div>

          {/* Pagination Controls */}
          <div className={`${filerDisplayCondition ? "hidden" : "block"} lg:hidden flex justify-center items-center mt-6`}>
            <button
              onClick={handlePrevPage}
              className={`px-4 py-2 border ${currentPage === 1 ? 'text-gray-400' : 'text-sky-500'} rounded`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              className={`px-4 py-2 border ${currentPage === totalPages ? 'text-gray-400' : 'text-sky-500'} rounded`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4 w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentProducts.map((product) => (
                <div key={product.id} className="border p-4 rounded shadow hover:shadow-md transition-shadow h-full">
                  <Link href={`/product/${params.product_category}/${product.id}`} className="text-sky-500 hover:underline block">
                  <div className="relative h-40 w-full">
                      <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} />
                    </div>
                  </Link>
                  <div>
                    <h3 className="mt-2 text-md font-bold items-end">{product.name}</h3>
                    <Link href={`/product/${params.product_category}/${product.id}`} className="text-sky-500 hover:underline mt-2 block">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className={`${filerDisplayCondition ? "hidden" : "block"} flex justify-center items-center mt-6`}>
              <button
                onClick={handlePrevPage}
                className={`px-4 py-2 border ${currentPage === 1 ? 'text-gray-400' : 'text-sky-500'} rounded`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                className={`px-4 py-2 border ${currentPage === totalPages ? 'text-gray-400' : 'text-sky-500'} rounded`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white px-10 lg:px-40 pb-10 bottom-0 lg:bottom-10">
        <h1 className="text-2xl font-bold py-2 text-sky-900">Get a Quote</h1>
        <ContactButton />
      </div>
      <Footer />
    </div>
  );
}
