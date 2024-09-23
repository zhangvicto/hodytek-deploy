"use client";

import Image from "next/image";
import Carousel from './carousel';
import ContactForm from './contact-form';
import Footer from './footer';
import Menu from './menu';
import Link from 'next/link'
import { useState, useEffect } from "react";
import publicDataURL from "./dataURL";

export default function Home() {
  return (
    <main className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <Carousel />
      <WhyUs />
      <hr className="w-3/4 mx-auto"></hr>
      <ProductCategorySlider />
      <WhatWeOffer />
      <ContactForm />
      <Footer />
    </main>
  );
}

function WhyUs() {
  return (
    <div className="flex-wrap md:flex md:flex-nowrap items-center justify-center p-10 lg:px-40 py-20">
      <div className="pr-5">
        <p className="text-3xl lg:text-4xl font-bold pb-10">Why Us</p>
        <p className="text-xl lg:text-2xl">Hodytek Ltd. provides products, consulting services, and integrated solutions for clients in the <Link href="/projects" className="font-semibold">oil and gas,  marine and offshore engineering, energy, telecommunications, sensors and instruments, construction,</Link> and many other related industries.</p>
      </div>
      <div className="flex rounded-sm justify-center w-full mt-10 lg:mt-0">
        <Image src="/images/carousel-backup.png" alt="about us" width="300" height="200" style={{ height: 200, width: 300, objectFit: "cover" }} />
      </div>
    </div>
  )
}

function WhatWeOffer() {
  return (
    <div className="flex flex-col items-center justify-center bg-sky-900 mb-0 px-6 lg:px-40 py-20">
      {/* Header Section */}
      <div className="text-white text-center mb-10">
        <p className="text-3xl lg:text-4xl font-bold mb-4">What We Offer</p>
        <p className="text-base lg:text-lg text-gray-300">
          Explore our comprehensive range of products and services tailored to meet your needs.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full text-white text-left">
        {/* Supplies Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Supplies</h3>
          <p className="mb-4">We provide a wide range of products:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Hazardous and Industrial Cable Glands</li>
            <li>Cables</li>
            <li>Cable Ties</li>
            <li>Explosion-Proof Lighting & Junction Box</li>
            <li>Extremely Advanced Pipe & Cable Penetration Sealing System</li>
            <li>Generator Equipment</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Services</h3>
          <p className="mb-2">
            We offer <strong>comprehensive</strong> pre-sales, sales, and post-sales services for all the products we provide, ensuring complete satisfaction from start to finish.
          </p>
          <p className="mb-2">
            We act as a <strong>bridge</strong> between owners and builders, utilizing our extensive supplier network to offer a full range of products and facilitate valuable business relationships.
          </p>
          <p>
            We have strong <strong>partnerships</strong> with design firms, engineering companies, and shipyards across China and Southeast Asia, providing our clients with seamless support and solutions.
          </p>
        </div>

        {/* Solutions Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Solutions</h3>
          <p className="mb-4">
            Our professional team of <strong>experts</strong> and engineers are here to provide:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Customized solutions</strong> for cables and cable accessories
            </li>
            <li>
              Solutions for <strong>explosion-proof</strong> lighting, cable glands, and other hazardous/industrial environment cable components.
            </li>
          </ul>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mt-10">
        <Link
          href="/product"
          aria-label="Browse our products"
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          Browse Our Products
        </Link>
        <Link
          href="#form"
          aria-label="Contact us"
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

function ProductCategorySlider() {
  const [productData, setProductData] = useState<ProductAll[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize windowWidth without accessing window during SSR
  const [windowWidth, setWindowWidth] = useState<number>(1024);

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
    image: string;
    subcategories: ProductSubcategory[];
  };

  // Update windowWidth on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set the initial window width
      setWindowWidth(window.innerWidth);

      // Update windowWidth when the window is resized
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Fetch products when windowWidth changes
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(publicDataURL('data.json'));
      const data = await res.json();

      const staticCategory: ProductAll = {
        name: 'Cable Glands and Accessories',
        slug: 'cable-glands',
        image: '/images/cable-glands.png',
        subcategories: [
          {
            name: 'Cable Glands',
            products: [
              {
                name: 'Cable Gland',
                id: 'fixed-cable-gland',
                image: '/images/OSCG.jpg',
                description: 'High-quality cable glands and accessories.',
              },
            ],
          },
        ],
      };

      const dataArray: ProductAll[] = Object.values(data);
      setProductData([staticCategory, ...dataArray]);
    };
    fetchProducts();
  }, [windowWidth]); // Use windowWidth in the dependency array

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused]);

  // Calculate products per slide based on windowWidth
  const productsPerSlide = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 3 : 2;
  const totalSlides = Math.ceil(productData.length / productsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  function getFirstProductImage(category: ProductAll): string {
    const subcategories = Object.values(category.subcategories);
    if (!subcategories.length) return '';
    for (const subcategory of subcategories) {
      if (subcategory.products.length > 0) {
        return subcategory.products[0].image;
      }
    }
    return '';
  }

  let touchStartX: number = 0;
  let touchEndX: number = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    }
    if (touchEndX - touchStartX > 50) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden lg:px-40 px-10 my-20"
    >
      <p className="text-3xl lg:text-4xl font-bold mb-10">Our Products</p>

      {/* Slider Content */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out my-2"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {productData.map((productCategory, index) => (
            <div
              key={productCategory.slug}
              className={`p-2 w-full lg:w-1/4 sm:w-1/3 w-1/2 flex-shrink-0`}
            >
              <div className="p-4 h-full rounded shadow hover:shadow-md transition-shadow">
                <Link
                  href={`/product/${productCategory.slug}`}
                  className="text-sky-500 hover:underline mt-2 block"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={productCategory.image}
                      alt={`${productCategory.name} image`}
                      fill
                      style={{objectFit:"contain"}}
                    />
                  </div>
                </Link>
                <h3 className="mt-2 text-lg font-bold">{productCategory.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="flex justify-center items-center p-4">
        <button
          onClick={prevSlide}
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
