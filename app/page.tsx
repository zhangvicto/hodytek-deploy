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
      <AboutUs />
      <hr className="w-3/4 mx-auto"></hr>
      <ProductCategorySlider />
      <WhyUs />
      <ContactForm />
      <Footer />
    </main>
  );
}

function AboutUs() {
  return (
    <div className="flex-wrap md:flex md:flex-nowrap items-center justify-center p-10 lg:px-40 py-20">
      <div className="pr-5">
        <p className="text-3xl lg:text-4xl font-bold pb-2">Why Us</p>
        <p className="text-xl lg:text-2xl">Hodytek Ltd. provides products, consulting services, and integrated solutions for clients in the <Link href="/projects" className="font-semibold">oil & gas,  marine and offshore engineering, energy, telecommunications, sensors and instruments, construction,</Link> and many other related industries.</p>
      </div>
      <div className="flex justify-center w-full mt-20 lg:mt-0">
        <Image src="/images/projects/drillship.jpeg" alt="about us" width="300" height="200" />
      </div>
    </div>
  )
}

function WhyUs() {
  return (
    <div className="flex flex-col items-center justify-center bg-sky-900 mb-10 px-6 lg:px-40 py-20">
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
            <li>Cables</li>
            <li>Cable glands</li>
            <li>Cable seals</li>
            <li>Cable ties</li>
            <li>Explosion-proof lighting</li>
            <li>Explosion-proof junction boxes</li>
            <li>Distribution boxes</li>
            <li>Generator equipment</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Services</h3>
          <p className="mb-2">We offer comprehensive pre-sales, in-sales, and post-sales services for all the products we provide, ensuring complete satisfaction from start to finish.</p>
          <p className="mb-2">We act as a bridge between owners and builders, utilizing our extensive supplier network to offer a full range of products and facilitate valuable business relationships.</p>
          <p>We have strong partnerships with design firms, engineering companies, and shipyards across China and Southeast Asia, providing our clients with seamless support and solutions.</p>
        </div>

        {/* Solutions Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Solutions</h3>
          <p className="mb-4">Our professional team of experts and engineers are here to provide:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Customized solutions for cables and cable accessories</li>
            <li>Solutions for explosion-proof lighting, junction boxes, and distribution boxes</li>
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
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024); // Provide a default width

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

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const fetchProducts = async () => {
      const res = await fetch(publicDataURL('data.json'));
      const data = await res.json();

      // Add the static product category to the dynamic data
      const staticCategory: ProductAll = {
        name: "Cable Glands and Accessories",
        slug: "cable-glands",
        subcategories: [
          {
            name: "Cable Glands",
            products: [
              {
                name: "Cable Gland",
                id: "fixed-cable-gland",
                image: "./images/oscg.jpg",
                description: "High-quality cable glands and accessories."
              }
            ]
          }
        ]
      };

      const dataArray: ProductAll[] = Object.values(data);

      // Prepend the static category to the fetched data
      setProductData([staticCategory, ...dataArray]);
    };
    fetchProducts();
  }, [window.innerWidth]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // Slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused]);

  // Determine products per slide based on screen width
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

  // Handle touch events for mobile swiping
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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <p className="text-3xl lg:text-4xl font-bold mb-10">Our Products</p>

      {/* Slider Content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData
          .slice(currentSlide * productsPerSlide, (currentSlide + 1) * productsPerSlide)
          .map((productCategory) => (
            <div key={productCategory.slug} className="p-4 rounded shadow hover:shadow-md transition-shadow">
              <Link href={`/product/${productCategory.slug}`} className="text-sky-500 hover:underline mt-2 block">
                <div style={{ height: '20vh', overflow: 'hidden' }}>
                  <Image
                    src={getFirstProductImage(productCategory)}
                    alt={productCategory.name + ' image'}
                    height={200}
                    width={300}
                    objectFit="contain"
                    className="w-full"
                  />
                </div>
              </Link>
              <h3 className="mt-2 text-lg font-bold">{productCategory.name}</h3>
            </div>
          ))}
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
